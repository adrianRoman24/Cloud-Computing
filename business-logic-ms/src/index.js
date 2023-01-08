const config = require("../config/config.json");
// set env variables
Object.keys(config).forEach((key) => {
    config[key] = process.env[key] || config[key];
});

const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require('@elastic/elasticsearch');
const fs = require("fs");

const { logger, sleep } = require("./utils");
logger.info(config);

const app = express();

async function connectToEs() {
    let esUp = false;
    logger.log("Try to connect to es");
    const esClient = new Client({
        node: config.ELASTICSEARCH_NODE,
        auth: {
            username: config.ELASTICSEARCH_USER,
            password: config.ELASTICSEARCH_PASSWORD
        },
        tls: {
            //ca: fs.readFileSync(config.ELASTICSEARCH_CA_FILE),
            rejectUnauthorized: false
        },
    });
    try {
        const pingResponse = await esClient.ping();
        if (pingResponse === true) {
            logger.info("Elasticsearch client is up");
            esUp = true;
        } else {
            logger.warn("Elasticsearch client ping returned false");
        }
    } catch (err) {
        logger.error(`Elasticsearch cluster is down: ${err.message}`);
    }
    return { esClient, esUp };
}

(async () => {
    let esUp = false;
    let esClient = null;
    while (esUp === false) {
        try {
            ({esUp, esClient} = await connectToEs());
            if (esUp === false) {
                logger.warn(`Retry to connect to es: ${config.ELASTICSEARCH_NODE}`);
                await sleep(5000);
            }
        } catch (error) {

        }
    }
    const advertisementIndexExists = await esClient.indices.exists({
        index: config.ADVERTISEMENT_INDEX,
    });
    if (!advertisementIndexExists) {
        await esClient.indices.create({
            index: config.ADVERTISEMENT_INDEX,
        });
    }

    app.use(bodyParser.json());
    require("../routes")(app, esClient);

    app.get("/", (_, res) => {
        logger.log("OK");
        res.sendStatus(200);
    });

    app.listen(config.SERVER_PORT, () => {
        logger.log(`Listening on port ${config.SERVER_PORT}`);
    });
})();

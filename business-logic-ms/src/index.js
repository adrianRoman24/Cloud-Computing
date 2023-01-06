const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require('@elastic/elasticsearch');
const fs = require("fs");

const { logger } = require("./utils");
const config = require("../config/config.json");
logger.info(config);

const app = express();

async function connectToEs() {
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
        } else {
            logger.warn("Elasticsearch client ping returned false");
        }
    } catch (err) {
        logger.error(`Elasticsearch cluster is down: ${err.message}`);
        logger.error("Exit process");
        process.exit(1);
    }
    return esClient;
}

(async () => {
    const esClient = await connectToEs();
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

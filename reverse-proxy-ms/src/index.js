const config = require("../config/config.json");
Object.keys(config).forEach((key) => {
    config[key] = process.env[key] || config[key];
});

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require('cors');

const { logger } = require("./utils");

const app = express();

(async () => {
    app.use(bodyParser.json());
    app.use(cors({
        origin: 'http://172.28.69.57:8080'
    }));

    app.get("/advertisement", async (req, res) => {
        try {
            const result = await axios({
                method: "GET",
                url: `${config.ADVERTISEMENT_MS_URL}/advertisement`,
                data: req.query,
            });
            logger.info("GET OK ");
            res.send(result.data);
        } catch (error) {
            logger.error(error);
            res.sendStatus(400);
        }
    });

    app.post("/advertisement", async (req, res) => {
        try {
            const result = await axios({
                method: "POST",
                url: `${config.ADVERTISEMENT_MS_URL}/advertisement`,
                data: req.body,
            });
            logger.info("POST OK ");
            res.send(result.data);
        } catch (error) {
            logger.error(error);
            res.sendStatus(400);
        }
    });

    app.get("/", (_, res) => {
        logger.log("OK");
        res.sendStatus(200);
    });

    app.listen(config.SERVER_PORT, () => {
        logger.log(`Listening on port ${config.SERVER_PORT}`);
    });
})();

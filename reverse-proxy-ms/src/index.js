const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const config = require("../config/config.json");

const { logger } = require("./utils");

const app = express();

(async () => {
    app.use(bodyParser.json());

    app.get("/advertisement", async (req, res) => {
        try {
            const result = await axios({
                method: "GET",
                url: `${config.ADVERTISEMENT_MS_URL}/advertisement`,
                data: req.body,
            });
            logger.info("GET OK ", result.data);
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
            logger.info("POST OK ", result.data);
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

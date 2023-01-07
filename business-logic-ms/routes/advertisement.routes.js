module.exports = (app, esClient) => {
    const router = require("express").Router();
    const advertisementCtrl = require("../controller/advertisement.controller");
    const { logger } = require("../src/utils");

    router.get("/advertisement", async (req, res) => {
        try {
            const result = await advertisementCtrl.get(req, esClient);
            logger.info("GET OK ", result);
            res.send(result);
        } catch (error) {
            logger.error(error);
            res.sendStatus(400);
        }
    });

    router.post("/advertisement", async (req, res) => {
        try {
            const result = await advertisementCtrl.create(req, esClient);
            logger.info("POST OK ", result);
            res.send(result);
        } catch (error) {
            logger.error(error);
            res.sendStatus(400);
        }
    });

    app.use("/", router);
};
const advertisementRoutes = require("./advertisement.routes");

module.exports = (app, esClient) => {
    advertisementRoutes(app, esClient);
};

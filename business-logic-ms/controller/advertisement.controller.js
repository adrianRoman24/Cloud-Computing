const config = require("../config/config.json");

const allowedFields = ["id", "mileage", "make", "model", "fuel", "gear", "offerType", "price", "hp", "year", "phone", "name"];

exports.create = async(req, esClient) => {
    const requestedFields = Object.keys(req.body);
    if ((!requestedFields.every(field => allowedFields.includes(field))) || requestedFields.length !== allowedFields.length) {
        throw Error("Wrong fields", requestedFields);
    }
    const result = await esClient.index({
        index: config.ADVERTISEMENT_INDEX,
        body: req.body,
    });
    return result;
};

exports.get = async(req, esClient) => {
    const requestedFields = Object.keys(req.body);
    if (!requestedFields.every(field => allowedFields.includes(field))) {
        throw Error("Wrong fields", requestedFields);
    }
    const must = [];
    for (const [key, value] of Object.entries(req.body)) {
        const currentFilter = {
            term: {
             
            }
        };
        currentFilter.term[key] = value;
        must.push(currentFilter);
    }
    const result = await esClient.search({
        index: config.ADVERTISEMENT_INDEX,
        query: {
            bool: {
                must,
            },
        },
    });
    return result.hits.hits;
};
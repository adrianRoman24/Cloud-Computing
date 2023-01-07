const config = require("../config/config.json");
const md5 = require("md5");

const allowedFields = ["mileage", "make", "model", "fuel", "gear", "offerType", "price", "hp", "year", "phone", "name"];

exports.create = async(req, esClient) => {
    const requestedFields = Object.keys(req.body);
    if ((!requestedFields.every(field => allowedFields.includes(field))) || requestedFields.length !== allowedFields.length) {
        throw Error("Wrong fields", requestedFields);
    }
    const id = md5(JSON.stringify(req.body) + Date.now());
    req.body.id = id;
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
            match: {
             
            }
        };
        currentFilter.match[key] = value;
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
    return result.hits.hits.map((elem) => { return elem._source });
};

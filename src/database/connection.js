const knex = require("knex");

const configuration = require("../../knexfile");

// variavel global gerada pelo component cross no package.json
const config =
    process.env.NODE_ENV === "test"
        ? configuration.test
        : configuration.development;

const connection = knex(config);

module.exports = connection;

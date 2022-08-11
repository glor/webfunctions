const path = require("path");
const config = require(path.join(__dirname, "config.js"));

const knex = require("knex")(config.knexconfig);
module.exports = knex;
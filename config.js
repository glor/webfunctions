const path = require("path");

module.exports = {
    "knexconfig": {
        client: "better-sqlite3",
        connection: {
            filename: path.join(__dirname, "db.sqlite3")
        }
    },
    "apiKey": "hase123"
};
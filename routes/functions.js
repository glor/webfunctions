const express = require("express");
const router = express.Router();
const path = require("path");
const knex = require(path.join(__dirname, "..", "db.js"))

/* GET users listing. */
router.use("/:username/:functionname/:token", function (req, res, next) {
    console.error(req.method);
    knex("functions")
        .select("function")
        .where("user", req.params.username)
        .where("token", req.params.token)
        .where("method", req.method)
        .first()
        .then(result => {
            console.log(result);
            eval(result.function)(req, res, next);
        });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");
const knex = require(path.join(__dirname, "..", "db.js"));
const basicAuth = require("express-basic-auth");

router.use(basicAuth({
    users: {
        "admin": require(path.join(__dirname, "..", "config.js"),).apiKey
    },
    challenge: true
}));

/* GET home page. */
router.get("/", function (req, res, next) {
    knex("functions")
        .then(result => {
            res.render("index", {functions: result});
        });
});

router.get("/edit/:username/:functionname/:token", function (req, res, next) {
    knex("functions")
        .where("user", req.params.username)
        .where("token", req.params.token)
        .where("name", req.params.functionname)
        .first()
        .then(result => {
            res.render("edit", {f: result});
        });
});

router.get("/delete/:username/:functionname/:token", function (req, res, next) {
    knex("functions")
        .where("user", req.params.username)
        .where("token", req.params.token)
        .where("name", req.params.functionname)
        .del()
        .then(() => res.send(res.render("deleted")));
});

router.post("/edit/:username/:functionname/:token", function (req, res, next) {
    const f = req.body;
    console.error(JSON.stringify(req.body));
    knex("functions")
        .where("user", req.params.username)
        .where("token", req.params.token)
        .where("name", req.params.functionname)
        .update(f)
        .then(() => {
            res.render("updated", {f});
        });
});

const randomId = () => (Math.random() + 1).toString(36).substring(7);

router.get("/new", function (req, res, next) {
    const f = {
        "user": "glor",
        "name": randomId(),
        function: "(req, res) => { res.send('ok'); }",
        method: "GET",
        token: randomId()
    };
    knex("functions")
        .insert(f)
        .then(result => res.redirect(`/edit/${f.user}/${f.name}/${f.token}`));
});

module.exports = router;

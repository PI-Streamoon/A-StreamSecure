var express = require("express");
var router = express.Router();

var predictController = require("../controllers/predictController");


router.get("/exibirMemoria", function (req, res) {
    predictController.exibirMemoria(req, res);
});

module.exports = router;
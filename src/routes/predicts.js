var express = require("express");
var router = express.Router();

var predictController = require("../controllers/predictController");

router.get("/predictCPU", function (req, res) {
    predictController.predictCPU(req, res);
});

router.get("/predictUpload", function (req, res) {
    predictController.predictUpload(req, res);
});

router.get("/exibirMemoria", function (req, res) {
    predictController.exibirMemoria(req, res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var metricaController = require("../controllers/metricaController");

router.post("/atualizarMetricas", function (req, res) {
    metricaController.atualizarMetricas(req, res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var slackController = require("../controllers/slackController");

router.get("/qtdAlertasPorPersona", function (req, res) {
    slackController.qtdAlertasPorPersona(req, res);
});

router.get("/qtdAlertasRecente", function (req, res) {
    slackController.buscarAlertasRecentes(req, res);
})

router.get("/qtdFuncionariosAlertas", function (req, res) {
    slackController.buscarFuncionariosAlertas(req, res);
})
module.exports = router;
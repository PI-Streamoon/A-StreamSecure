var express = require("express");
var router = express.Router();

var chamadosController = require("../controllers/chamadosController");

router.get("/totalChamadosResolvidos", function (req, res) {
    chamadosController.totalChamadosResolvidos(req, res);
})

router.get("/abrirChamado", function (req, res) {
    chamadosController.abrirChamado(req, res);
})

router.get("/totalChamadosAbertos", function (req, res) {
    chamadosController.totalChamadosAbertos(req, res);
})

router.get("/fecharChamado", function (req, res) {
    chamadosController.fecharChamado(req, res);
})

router.get("/totalChamados", function (req, res) {
    chamadosController.totalChamados(req, res);
})

module.exports = router;
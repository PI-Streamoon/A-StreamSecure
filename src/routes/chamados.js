var express = require("express");
var router = express.Router();

var chamadosController = require("../controllers/chamadosController");

router.post("/abrirChamado", function (req, res) {
    chamadosController.abrirChamado(req, res);
})

router.get("/totalChamadosAbertosResolvidos", function (req, res) {
    chamadosController.totalChamadosAbertosResolvidos(req, res);
})

router.post("/atualizarStatusChamado/:idChamado", function (req, res) {
    chamadosController.atualizarStatusChamado(req, res);
})

router.get("/totalChamados", function (req, res) {
    chamadosController.totalChamados(req, res);
})

router.get("/totalChamadosPorPrioridade", function (req, res) {
    chamadosController.totalChamadosPorPrioridade(req, res);
})

module.exports = router;
var express = require("express");
var router = express.Router();

var chamadosController = require("../controllers/chamadosController");

router.get("/totalChamadosResolvidos", function (req, res) {
    chamadosController.totalChamadosResolvidos(req, res);
})

router.get("/abrirChamado", function (req, res) {
    chamadosController.totalPDia(req, res);
})

router.get("/totalChamadosCriticos", function (req, res) {
    chamadosController.totalChamadosCriticos(req, res);
})

router.get("/chamadoResolvido", function (req, res) {
    chamadosController.chamadoResolvido(req, res);
})

router.get("/totalChamados", function (req, res) {
    chamadosController.totalChamadosCriticos(req, res);
})



module.exports = router;
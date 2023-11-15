var express = require("express");
var router = express.Router();

var calculadoraController = require("../controllers/calculadoraController");

router.get("/mostrarInstancias", function (req, res) {
    calculadoraController.mostrarInstancias(req, res);
});

router.get("/mostrarRegioes", function (req, res) {
    calculadoraController.mostrarRegioes(req, res);
});

router.get("/mostrarSO", function (req, res) {
    calculadoraController.mostrarSO(req, res);
});

module.exports = router;
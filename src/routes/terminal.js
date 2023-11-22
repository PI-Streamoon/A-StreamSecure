var express = require("express");
var router = express.Router();

var terminalController = require("../controllers/terminalController");

//Recebendo os dados do html e direcionando para a função cadastrar de servidor.js

router.post("/inserirComando", function (req, res) {
    terminalController.inserirComando(req, res);
});

router.get("/lerComando", function (req, res) {
    terminalController.lerComandos(req, res);
});

module.exports = router;
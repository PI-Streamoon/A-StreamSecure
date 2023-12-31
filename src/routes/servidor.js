var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

//Recebendo os dados do html e direcionando para a função cadastrar de servidor.js

router.get("/listarServidores", function (req, res) {
    servidorController.listarServidores(req, res);
});

router.get("/status", function (req, res) {
    servidorController.status(req, res);
});

router.get("/estadoServidor", function (req, res) {
    servidorController.estadoServidor(req, res);
});

module.exports = router;
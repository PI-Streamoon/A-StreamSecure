var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

//Recebendo os dados do html e direcionando para a função cadastrar de servidor.js

router.get("/pegarLocal", function (req, res) {
    servidorController.pegarLocal(req, res);
});

// router.get("/pegarEstado", function (req, res) {
//     servidorController.pegarEstado(req, res);
// });
module.exports = router;
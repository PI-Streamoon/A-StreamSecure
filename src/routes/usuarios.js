var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/auth", function (req, res) {
    usuarioController.auth(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/mostrarEmpresas", function (req, res) {
    usuarioController.mostrarEmpresas(req, res);
});

router.put("/changePermission", function (req, res) {
    usuarioController.changePermission(req, res);
});

module.exports = router;
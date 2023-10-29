var express = require("express");
var router = express.Router();

var falhasController = require("../controllers/alertasController");

router.get("/geralPDia", function (req, res) {
    falhasController.geralPDia(req, res);
})

router.get("/total", function (req, res) {
    falhasController.total(req, res);
})



module.exports = router;
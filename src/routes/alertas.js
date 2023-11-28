var express = require("express");
var router = express.Router();

var falhasController = require("../controllers/alertasController");

router.get("/geralPDia", function (req, res) {
    falhasController.geralPDia(req, res);
})

router.get("/totalPDia", function (req, res) {
    falhasController.totalPDia(req, res);
})

router.get("/total", function (req, res) {
    falhasController.total(req, res);
})

router.get("/realTime", function (req, res) {
    falhasController.realTime(req, res);
})


module.exports = router;
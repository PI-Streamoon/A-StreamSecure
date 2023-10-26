var express = require("express");
var router = express.Router();

var falhasController = require("../controllers/alertasController");

router.get("/seteDias/falhas", function (req, res) {
    falhasController.seteDias(req, res, 1);
})

router.get("/seteDias/criticos", function (req, res) {
    falhasController.seteDias(req, res, 2);
})

router.get("/seteDias/total", function (req, res) {
    falhasController.seteDiasTotal(req, res);
})


module.exports = router;
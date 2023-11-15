var express = require("express");
var router = express.Router();
const exportController = require("../controllers/exportController");

router.get("/csv", function (req, res) {
    exportController.exportCSV(req, res);
})

router.get("/pdf", function (req, res) {
    exportController.exportPDF(req, res);
})


module.exports = router;
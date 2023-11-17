var express = require("express");
var router = express.Router();

var MoonAssistantController = require("../controllers/MoonAssistantController");

router.post("/send", function (req, res) {
    MoonAssistantController.send(req, res);
})


module.exports = router;
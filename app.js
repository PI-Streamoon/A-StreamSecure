//process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
const IP = require('ip');
const { spawn } = require("child_process");
const bodyParser = require('body-parser');
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 80;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var empresasRouter = require("./src/routes/empresas");
var servidorRouter = require("./src/routes/servidor");
var alertasRouter = require("./src/routes/alertas");
var calculadoraRouter = require("./src/routes/calculadora");
var chamadosRouter = require("./src/routes/chamados");
var exportRouter = require('./src/routes/exports');
var moonAssistantRouter = require('./src/routes/MoonAssistant');
var terminalRouter = require("./src/routes/terminal");

var slackRouter = require("./src/routes/slack");
var metricasRouter = require("./src/routes/metricas");
var predictsRouter = require("./src/routes/predicts");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/empresas", empresasRouter);
app.use("/servidor", servidorRouter);
app.use("/alertas", alertasRouter);
app.use("/chamados", chamadosRouter);
app.use("/exports", exportRouter);
app.use("/MoonAssistant", moonAssistantRouter);
app.use("/terminal", terminalRouter);
app.use(bodyParser.json());
app.use("/slack", slackRouter);
app.use("/calculadora", calculadoraRouter);
app.use("/metricas", metricasRouter);
app.use("/predicts", predictsRouter);

const ipAddress = IP.address();

const linkServer = `http://${ipAddress}:${PORTA}`;

app.listen(PORTA, function () {
    console.log(`Servidor Rodando Em:  ${linkServer}`);
});
process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
const IP = require('ip');
const { spawn } = require("child_process");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var empresasRouter = require("./src/routes/empresas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/empresas", empresasRouter);

const ipAddress = IP.address();

const linkServer = `http://${ipAddress}:${PORTA}`;

app.listen(PORTA, function () {
    console.log(`Servidor Rodando Em:  ${linkServer}`);
});

const curl = spawn("curl", [`qrenco.de/${linkServer}`]);

curl.stdout.on("data", data => {
    console.log(`qrcode:\n${data}`);
});
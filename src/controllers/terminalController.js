var terminalModel = require("../models/terminalModel");

function inserirComando(req, res) {
    terminalModel.lerComandos().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao inserir o comando: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function lerComando(req, res) {
    terminalModel.lerComando().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao ler o comando: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    inserirComando,
    lerComando
}
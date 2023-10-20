var servidorModel = require("../models/servidorModel");

function pegarLocal(req, res) {
    servidorModel.pegarLocal().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
            // return resultado;
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os servidores: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarEstado(req, res) {
    servidorModel.pegarEstado().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log(
            "Houve um erro ao buscar os estados: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pegarLocal,
    pegarEstado
}
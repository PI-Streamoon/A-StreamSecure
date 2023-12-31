var predictModel = require("../models/predictModel");

function predictCPU(req, res) {
    predictModel.predictCPU().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function predictUpload(req, res) {
    predictModel.predictUpload().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function exibirMemoria(req, res) {
    predictModel.exibirMemoria().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as memórias: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function exibirDisco(req, res) {
    predictModel.exibirDisco().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o disco: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function estadoServidor(req, res) {
    predictModel.estadoServidor().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o disco: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    predictCPU,
    predictUpload,
    exibirMemoria,
    exibirDisco,
    estadoServidor
}
var falhasModel = require("../models/alertasModel");

function seteDias(req, res, nivelFalhas){
    let idServidor = req.query.idServidor;

    falhasModel.seteDias(nivelFalhas, idServidor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function total(req, res){
    let dataInic = req.query.dataInic;
    let dataFinal = req.query.dataFinal;

    falhasModel.total(dataInic, dataFinal).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    seteDias,
    total
}
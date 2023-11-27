var slackModel = require("../models/slackModel")

function qtdAlertasPorPersona(req, res) {
    slackModel.qtdAlertasPorPersona().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarAlertasRecentes(req, res) {

    console.log(`Recuperando medidas em tempo real`);

    slackModel.buscarAlertasRecentes().then(function (resultado) {
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

function buscarFuncionariosAlertas(req, res) {
    slackModel.buscarFuncionariosAlertas().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    qtdAlertasPorPersona,
    buscarAlertasRecentes,
    buscarFuncionariosAlertas
}
var chamadosModel = require("../models/chamadosModel");

function abrirChamado(req, res) {
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var prioridade = req.body.prioridadeServer;
    var responsavel = req.body.responsavelServer;
    var dataAtual = req.body.dataServer;
    
    // Faça as validações dos valores
    if (titulo == undefined) {
        res.status(400).send("Seu titulo está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Sua descricao está undefined!");
    } else if (prioridade == undefined) {
        res.status(400).send("Sua prioridade está undefined")
    } else if (responsavel == undefined) {
        res.status(400).send("Seu responsavel está undefined")
    } else if (dataAtual == undefined) {
        res.status(400).send("Sua data está undefined")
    }
    else {
        chamadosModel.abrirChamado(titulo, descricao, prioridade, responsavel, dataAtual)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao abrir o chamado! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
    }
}

function totalChamados(req, res) {
    chamadosModel.totalChamados().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os chamados: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

async function atualizarStatusChamado(req, res) {
    const idChamado = req.params.idChamado;
    const novoStatus = req.body.statusServer;

    console.log(idChamado)
    console.log(novoStatus)

    chamadosModel.atualizarStatusChamado(idChamado, novoStatus)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao abrir o chamado! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function totalChamadosAbertosResolvidos(req, res) {
    chamadosModel.totalChamadosAbertosResolvidos().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os chamados: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function totalChamadosPorPrioridade(req, res) {
    chamadosModel.totalChamadosPorPrioridade().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os chamados: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    abrirChamado,
    totalChamados,
    totalChamadosPorPrioridade,
    totalChamadosAbertosResolvidos,
    atualizarStatusChamado
}
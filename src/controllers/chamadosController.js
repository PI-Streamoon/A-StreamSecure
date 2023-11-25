var chamadosModel = require("../models/chamadosModel");

function abrirChamado(req, res) {
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var prioridade = req.body.prioridadeServer;
    var responsavel = req.body.responsavelServer;
    var dataAtual = req.body.dateServer;
    
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

module.exports = {
    abrirChamado
}
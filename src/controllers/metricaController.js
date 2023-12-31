var metricaModel = require("../models/metricaModel");

function atualizarMetricas(req, res) {
    const valorAlertaServer = req.body.alertaServer;
    const valorCriticoServer = req.body.criticoServer;
    var fkCompServidorServer = req.query.fkComponenteServidor;

    metricaModel.atualizarMetricas(valorAlertaServer, valorCriticoServer, fkCompServidorServer)
                .then(
                    function (resultado) {
                        res.json(resultado);
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao atualizar as métricas! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                );
}

module.exports = {
    atualizarMetricas
}
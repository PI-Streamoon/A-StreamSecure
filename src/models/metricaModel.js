var database = require("../database/config")

function atualizarMetricas(alerta, critico) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function attMetricas(): ", alerta,critico)
    var instrucao = `
        UPDATE metricas SET maxValorNormal = '${alerta}', maxValorAlerta = '${critico}' WHERE fkComponente = 101;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    atualizarMetricas
}
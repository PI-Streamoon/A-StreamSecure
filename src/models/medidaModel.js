var database = require("../database/config");

function plotarGrafico(idServidor) {
    const instrucao = `
    SELECT DATE_FORMAT(MomentoRegistro, '%d-%m-%Y %H:%i:%s') AS dtHora,
       CPU,
       FrequenciaCPU,
       Memoria,
       MemoriaUsada,
       MemoriaTotal,
       Disco,
       Upload,
       Download
        FROM streamoon.registrocolunar
        WHERE idServidor = ${idServidor}
        ORDER BY dtHora DESC LIMIT 1;
    `

    return database.executar(instrucao);
} 


function geral(idServidor) {
    var instrucao = ``

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucao = `
        SELECT DATE_FORMAT(MomentoRegistro, '%d-%m-%Y %H:%i:%s') AS dtHora,
           CPU,
           Memoria,
           Disco
            FROM streamoon.registrocolunar
            WHERE idServidor = ${idServidor}
            ORDER BY dtHora DESC LIMIT 1;
        `
    } else {
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    plotarGrafico,
    geral
}
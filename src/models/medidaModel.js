var database = require("../database/config");
var ambiente = process.env.AMBIENTE_PROCESSO;

function plotarGrafico(idServidor = "0 OR TRUE", limit) {
    var instrucao = ``
    if(ambiente == "desenvolvimento"){
        instrucao = `
            SELECT idServidor,
                DATE_FORMAT(MomentoRegistro, '%H:%i:%s') AS dtHora,
                CPU,
                FrequenciaCPU,
                Memoria,
                MemoriaUsada,
                MemoriaTotal,
                Disco,
                Upload,
                Download,
                DiscoEntrada,
                DiscoSaida
                FROM registroColunar
                WHERE idServidor = ${idServidor}
                ORDER BY MomentoRegistro DESC LIMIT ${limit};
        `
    }else{
        instrucao = `
            SELECT TOP ${limit}
                idServidor,
                FORMAT(MomentoRegistro, 'HH:mm:ss') AS dtHora,
                CPU,
                FrequenciaCPU,
                Memoria,
                MemoriaUsada,
                MemoriaTotal,
                Disco,
                Upload,
                Download,
                DiscoEntrada,
                DiscoSaida
                FROM registroColunar
                WHERE idServidor = ${idServidor}
                ORDER BY MomentoRegistro DESC;
        `
    }

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
} 


function geral(idServidor) {
    var instrucao = ``

    if (ambiente == "producao") {
        instrucao = `
        SELECT TOP 1 
            FORMAT(MomentoRegistro, 'dd-MM-yyyy HH:mm:ss') AS dtHora,
           CPU,
           Memoria,
           Disco
            FROM registroColunar
            WHERE idServidor = ${idServidor}
            ORDER BY dtHora DESC;
        `

    } else if (ambiente == "desenvolvimento") {

        instrucao = `
        SELECT FORMAT(MomentoRegistro, '%d-%m-%Y %H:%i:%s') AS dtHora,
           CPU,
           Memoria,
           Disco
            FROM registroColunar
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
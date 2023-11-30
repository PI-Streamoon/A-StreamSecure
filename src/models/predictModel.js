var database = require("../database/config");
var ambiente = process.env.AMBIENTE_PROCESSO;

function predictCPU() {
    var instrucaoSQL = ``;

    if (ambiente == "desenvolvimento") {
        instrucaoSQL = `
            SELECT r.registro,
            p.dadoPredict,
            DATE_FORMAT(r.dtHora, '%d-%m-%Y %H:%i:%s') AS dtHora
            FROM registro r
            INNER JOIN predict p ON p.fkRegistro = r.idRegistro
            WHERE r.fkComponenteServidor = 1
            ORDER BY r.dtHora DESC
            LIMIT 10;
        `;

    } else {
        instrucaoSQL = `
            SELECT TOP 10
            r.registro,
            p.dadoPredict,
            FORMAT(r.dtHora, 'dd-MM-yyyy HH:mm:ss') AS dtHora
            FROM registro r
            INNER JOIN predict p ON p.fkRegistro = r.idRegistro
            WHERE r.fkComponenteServidor = 1
            ORDER BY r.dtHora DESC;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function predictUpload() {
    var instrucaoSQL = ``;

    if (ambiente == "desenvolvimento") {
        instrucaoSQL = `
            SELECT r.registro,
            p.dadoPredict,
            DATE_FORMAT(r.dtHora, '%d-%m-%Y %H:%i:%s') AS dtHora
            FROM registro r
            INNER JOIN predict p ON p.fkRegistro = r.idRegistro
            WHERE r.fkComponenteServidor = 9
            ORDER BY r.dtHora DESC
            LIMIT 10;
        `;

    } else {
        instrucaoSQL = `
        SELECT TOP 10
        r.registro,
        p.dadoPredict,
        FORMAT(r.dtHora, 'dd-MM-yyyy HH:mm:ss') AS dtHora
        FROM registro r
        INNER JOIN predict p ON p.fkRegistro = r.idRegistro
        WHERE r.fkComponenteServidor = 9
        ORDER BY r.dtHora DESC;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function exibirMemoria() {
    var instrucaoSQL = ``;

    if (ambiente == "desenvolvimento") {
        instrucaoSQL = `
        SELECT Memoria, MemoriaTotal, MemoriaUsada 
        FROM registroColunar 
        ORDER BY MomentoRegistro DESC LIMIT 1;
        `;

    } else {
        instrucaoSQL = `
        SELECT TOP 1
        MemoriaTotal, MemoriaUsada 
        FROM registroColunar 
        ORDER BY MomentoRegistro DESC;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function exibirDisco() {
    var instrucaoSQL = ``;

    if (ambiente == "desenvolvimento") {
        instrucaoSQL = `
        SELECT DiscoEntrada, DiscoSaida 
        FROM registroColunar 
        ORDER BY MomentoRegistro DESC LIMIT 1;
        `;

    } else {
        instrucaoSQL = `
        SELECT TOP 1
        DiscoEntrada, DiscoSaida 
        FROM registroColunar 
        ORDER BY MomentoRegistro DESC;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function estadoServidor() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");
    var instrucao = ``
    if (ambiente == "desenvolvimento") {
        instrucao = `
            SELECT Status
            FROM situacaoServidor 
            ORDER BY MomentoRegistro DESC LIMIT 1;
        `;
    } else {
        instrucao = `
        SELECT TOP 1
            Status
        FROM situacaoServidor 
        GROUP BY MomentoRegistro DESC;
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    predictCPU,
    predictUpload,
    exibirMemoria,
    exibirDisco,
    estadoServidor
}
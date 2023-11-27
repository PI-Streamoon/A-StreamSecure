var database = require("../database/config");
var ambiente = process.env.AMBIENTE_PROCESSO;

function predictCPU() {
    var instrucaoSQL = ``;

    if(ambiente == "desenvolvimento"){
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
    
    }else{
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

    if(ambiente == "desenvolvimento"){
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
    
    }else{
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
    var instrucao = ``;

    if(ambiente == "desenvolvimento"){
        instrucaoSQL = `
        SELECT MemoriaTotal, MemoriaUsada 
        FROM streamoon.registroColunar 
        ORDER BY MomentoRegistro DESC LIMIT 1;
        `;
    
    }else{
        instrucaoSQL = `
        SELECT TOP 1
        MemoriaTotal, MemoriaUsada 
        FROM streamoon.registroColunar 
        ORDER BY MomentoRegistro DESC;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    exibirMemoria,
    predictCPU,
    predictUpload
}
var database = require("../database/config");

function predictCPU() {
    
    const instrucaoSQL = `
        SELECT r.registro,
        p.dadoPredict,
        DATE_FORMAT(r.dtHora, '%d-%m-%Y %H:%i:%s') AS dtHora
        FROM registro r
        INNER JOIN predict p ON p.fkRegistro = r.idRegistro
        WHERE r.fkComponenteServidor = 1
        ORDER BY r.dtHora DESC
        LIMIT 10;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function predictUpload() {
    
    const instrucaoSQL = `
        SELECT r.registro,
        p.dadoPredict,
        DATE_FORMAT(r.dtHora, '%d-%m-%Y %H:%i:%s') AS dtHora
        FROM registro r
        INNER JOIN predict p ON p.fkRegistro = r.idRegistro
        WHERE r.fkComponenteServidor = 9
        ORDER BY r.dtHora DESC
        LIMIT 10;
    `; 

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function exibirMemoria() {
    const instrucaoSQL = `
        SELECT MemoriaTotal, MemoriaUsada 
        FROM streamoon.registroColunar 
        ORDER BY MomentoRegistro DESC LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    exibirMemoria,
    predictCPU,
    predictUpload
}
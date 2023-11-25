var database = require("../database/config");

function predictCPU() {
    const instrucaoSQL = `
    SELECT p.dadoReal, p.dadoPredict, r.dtHora
    FROM predict p
    INNER JOIN registro r ON p.dadoReal = r.registro
    ORDER BY r.dtHora DESC LIMIT 10;
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
    predictCPU
}
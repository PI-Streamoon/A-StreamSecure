var database = require("../database/config");

function exibirMemoria() {
    instrucaoSQL = `SELECT MemoriaTotal, MemoriaUsada FROM streamoon.registroColunar ORDER BY MomentoRegistro DESC LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    exibirMemoria
}
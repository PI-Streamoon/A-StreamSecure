var database = require("../database/config");

function getPastMsgs(idUsuario){
    var instrucao = `
        SELECT * FROM logMoonAssistant WHERE fkUsuario = ${idUsuario} ORDER BY dtHora;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    getPastMsgs
}
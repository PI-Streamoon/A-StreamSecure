var database = require("../database/config");

function qtdAlertasPorPersona() {
    var instrucao = `
    SELECT count(idAlerta) as 'alertasManutencao', 
	(SELECT count(idAlerta) FROM alertasSlack WHERE isAnalista = 1) as 'alertasAnalista' 
		FROM alertasSlack WHERE isAnalista = 0;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarAlertasRecentes() {
    var instrucao = `
    SELECT count(idAlerta) as 'alertasManutencao', 
	(SELECT count(idAlerta) FROM alertasSlack WHERE isAnalista = 1) as 'alertasAnalista' 
		FROM alertasSlack WHERE isAnalista = 0;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarFuncionariosAlertas() {
    var instrucao = `
    SELECT (SELECT count(idUsuario) FROM usuario) as 'qtdFuncionarios',
	count(idAlerta) as 'qtdAlertas' FROM alertasSlack;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    qtdAlertasPorPersona,
    buscarAlertasRecentes,
    buscarFuncionariosAlertas
}
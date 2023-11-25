var database = require("../database/config");

function totalChamados(){
    const instrucao = `x`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function totalChamadosCritico(){

    const instrucao = `select aqui`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}

function totalChamadosResolvidos(){

    const instrucao = `select auqi`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}

function chamadoResolvido(idChamado) {
    
    const instrucao = `update aqui`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}

function abrirChamado(titulo, descricao, statusChamado, dataAbertura) {
    const instrucao = `insert aqui`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}



module.exports = {
    totalChamados,
    totalChamadosCritico,
    totalChamadosResolvidos,
    chamadoResolvido,
    abrirChamado
}
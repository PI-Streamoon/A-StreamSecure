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

function abrirChamado(titulo, descricao, prioridade, responsavel, dataAtual) {
    const instrucao = `INSERT INTO Chamados (titulo, descricao, dataAbertura, isAberto, prioridade, responsavel) 
                            VALUES (${titulo}, ${descricao}, ${dataAtual}, TRUE, ${prioridade}, ${responsavel},)`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}



module.exports = {
    abrirChamado
}
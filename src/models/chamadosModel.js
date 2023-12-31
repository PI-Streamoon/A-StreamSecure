var database = require("../database/config");
var ambiente = process.env.AMBIENTE_PROCESSO


function totalChamados(){
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");

    var instrucao = `SELECT * FROM chamados;`;

    


    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function totalChamadosAbertosResolvidos(){
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");

    const instrucao = `SELECT
        SUM(CASE WHEN isAberto = 1 THEN 1 ELSE 0 END) AS TotalAbertos,
        SUM(CASE WHEN isAberto = 0 THEN 1 ELSE 0 END) AS TotalFechados
        FROM Chamados;`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function totalChamadosPorPrioridade(){
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");


    const instrucao = `SELECT 
        SUM(CASE WHEN prioridade = 'Baixa' THEN 1 ELSE 0 END) as baixa,
        SUM(CASE WHEN prioridade = 'Média' THEN 1 ELSE 0 END) as media,
        SUM(CASE WHEN prioridade = 'Alta' THEN 1 ELSE 0 END) as alta,
        SUM(CASE WHEN prioridade = 'Urgente' THEN 1 ELSE 0 END) as urgente
        FROM Chamados`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}

function atualizarStatusChamado(idChamado, novoStatus) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");
    

    const instrucao = `UPDATE Chamados SET isAberto = ${novoStatus} WHERE idChamado = ${idChamado}`;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}

function abrirChamado(titulo, descricao, prioridade, responsavel, dataAtual) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function totalChamados()");

    var instrucao = ``
    
    if(ambiente == "desenvolvimento"){
        instrucao = `INSERT INTO Chamados (titulo, descricao, dataAbertura, isAberto, prioridade, responsavel) 
        VALUES ('${titulo}', '${descricao}', '${dataAtual}', TRUE, '${prioridade}', '${responsavel}')`;
    } else {
        instrucao = `INSERT INTO Chamados (titulo, descricao, dataAbertura, isAberto, prioridade, responsavel) 
        VALUES ('${titulo}', '${descricao}', GETDATE(), 1, '${prioridade}', '${responsavel}')`;
    }                        

    console.log("Executando a instrução SQL: \n" + instrucao);

    
    return database.executar(instrucao);
    
}



module.exports = {
    abrirChamado,
    totalChamados,
    totalChamadosPorPrioridade,
    totalChamadosAbertosResolvidos,
    atualizarStatusChamado
}
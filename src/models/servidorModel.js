var database = require("../database/config");
var ambiente = process.env.AMBIENTE_PROCESSO

function listarServidores() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");
    var instrucao = `
        SELECT * FROM servidor 
            JOIN locais ON idLocais = fkLocais
            JOIN empresa ON fkEmpresa = idEmpresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function status() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");
    var instrucao = ``
    if(ambiente == "desenvolvimento"){
        instrucao = `
            SELECT idServidor, 
                DATE_FORMAT(MomentoRegistro, '%d/%m/%Y %H:%i:%s') MomentoRegistro,
                Status
            FROM situacaoServidor 
            GROUP BY idServidor, MomentoRegistro LIMIT 100;
        `;
    }else{
        instrucao = `
        SELECT TOP 100
            idServidor, 
            FORMAT(MomentoRegistro, 'dd/MM/yyyy HH:mm:ss') AS MomentoRegistro,
            Status
        FROM situacaoServidor 
        GROUP BY idServidor, MomentoRegistro;
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function estadoServidor() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");
    var instrucao = ``
    if(ambiente == "desenvolvimento"){
        instrucao = `
            SELECT idServidor, 
                DATE_FORMAT(MomentoRegistro, '%d/%m/%Y') MomentoRegistro,
                Status
            FROM situacaoServidor 
            GROUP BY idServidor, MomentoRegistro LIMIT 10;
        `;
    }else{
        instrucao = `
        SELECT TOP 10
            idServidor, 
            FORMAT(MomentoRegistro, 'dd/MM/yyyy') AS MomentoRegistro,
            Status
        FROM situacaoServidor 
        GROUP BY idServidor, MomentoRegistro;
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listarServidores,
    status,
    estadoServidor
}
var database = require("../database/config");
var ambiente = process.env.AMBIENTE_PROCESSO

function inserirComando(comandoDigitado, idServidorSelecionado) {
    var instrucao = `
    `;

    if(ambiente == "desenvolvimento"){
        instrucao = `INSERT INTO terminal (comando, fkServidor) VALUES ('${comandoDigitado}', ${idServidorSelecionado} );`
    }else{
        instrucao = `INSERT INTO terminal (comando, fkServidor) VALUES ('${comandoDigitado}', ${idServidorSelecionado} ); SELECT SCOPE_IDENTITY() AS insertId;`
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function lerComando(idTerminal) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarLocal()");
    var instrucao = `
        SELECT retorno FROM terminal WHERE idTerminal = ${idTerminal} AND retorno is not null;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    inserirComando,
    lerComando
}

var database = require("../database/config")

function mostrarInstancias(so, fkLocal) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirPerfil()");
    var instrucao = `
    SELECT * FROM dadosec2 WHERE so = '${so}' AND fkLocal = ${fkLocal} ORDER BY tipo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarRegioes() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirPerfil()");
    var instrucao = `
    SELECT * FROM locais WHERE fkEmpresa = 484020;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarSO() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirPerfil()");
    var instrucao = `
    SELECT
        so,
        COUNT(*) as repeticoes
    FROM dadosec2
    GROUP BY so 
    ORDER BY repeticoes DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    mostrarInstancias,
    mostrarRegioes,
    mostrarSO
};
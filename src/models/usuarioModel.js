var database = require("../database/config")

function auth(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function auth(): ", email,senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(fkAdmin) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario WHERE fkAdmin = ${fkAdmin}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, cpf, empresa, admin, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf, empresa, email, senha);
    
    var instrucao = `
        INSERT INTO usuario (nome, cpf, fkEmpresa, fkAdmin, email, senha) VALUES ('${nome}', '${cpf}', ${empresa}, ${admin}, '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarEmpresas() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirPerfil()");
    var instrucao = `
    SELECT idEmpresa, nome FROM empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function changePermission(fkAdmin, idUsuario){
    var instrucao = `
        UPDATE usuario SET fkAdmin = ${fkAdmin} WHERE idUsuario = ${idUsuario};
    `;

    return database.executar(instrucao);
}

module.exports = {
    auth,
    cadastrar,
    listar,
    mostrarEmpresas,
    changePermission
};
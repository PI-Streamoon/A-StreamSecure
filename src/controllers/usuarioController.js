var usuarioModel = require("../models/usuarioModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function auth(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.auth(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    var usuario = resultado[0];
                    if (resultado.length == 1) {
                        bcrypt.compare(senha, usuario['senha'], function (err, result) {
                            if (result) {
                                console.log(resultado);
                                res.json(resultado[0]);
                            }

                        });
                    }
                    else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listar(req, res) {
    let fkAdmin = req.query.fkAdmin;
    usuarioModel.listar(fkAdmin)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var empresa = req.body.empresaServer;
    var admin = req.body.fkAdminServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined")
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined")
    } else if (empresa == undefined) {
        res.status(400).send("Sua empresa está undefined")
    } else {

        bcrypt.hash(senha, saltRounds, (err, senha_criptografada) => {
            // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            usuarioModel.cadastrar(nome, cpf, empresa, admin, email, senha_criptografada)
                .then(
                    function (resultado) {
                        res.json(resultado);
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                );
        });
    }
}


function mostrarEmpresas(req, res) {

    usuarioModel.mostrarEmpresas().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    auth,
    cadastrar,
    listar,
    mostrarEmpresas
}
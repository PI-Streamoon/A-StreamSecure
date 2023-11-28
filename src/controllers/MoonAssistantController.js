const fetch = require('node-fetch');
const medidaModel = require("../models/medidaModel");
const alertasModel = require("../models/alertasModel");
const MoonAssistantModel = require("../models/MoonAssistantModel");

const formatarData = (data)=>{
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    
    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
}

async function queryMedidas(idServidor, messageServer, res){
    return new Promise ((resolve, reject)=>{
        medidaModel.plotarGrafico(idServidor, 10).then(function (resultado) {
            if (resultado.length > 0 && (resultado.length + messageServer.length) < 5000) {
                resolve(JSON.stringify(resultado));
            }else if((resultado.length + messageServer.length) >= 5000){
                res.status(500).json("Texto Muito Longo")
            } 
            else {
                res.status(204).json("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro);
            reject(erro);
        });
    })
}

async function queryFalhas(idServidor, messageServer, res){
    let dataAtual = new Date();
    dataInic = formatarData(dataAtual);

    dataAtual.setMonth(dataAtual.getMonth() - 1);
    dataFinal = formatarData(dataAtual);

    return new Promise ((resolve, reject)=>{
        alertasModel.totalPDia(dataFinal, dataInic, idServidor).then(function (resultado) {
            if (resultado.length > 0 && (resultado.length + messageServer.length) < 5000) {
                resolve(JSON.stringify(resultado));
            }else if((resultado.length + messageServer.length) >= 5000){
                res.status(500).json("Texto Muito Longo")
            } 
            else {
                res.status(204).json("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro);
            res.status(500).json(erro);
        });
    });
}

async function send(req, res){
    let hasMonitoramentoServer = req.body.hasMonitoramentoServer;
    let hasFalhasServer = req.body.hasFalhasServer;
    let messageServer = req.body.messageServer;
    let idServidorServer = req.body.idServidorServer;
    let idUsuarioServer = req.body.idUsuarioServer;

    let message = "";

    if(hasMonitoramentoServer){
        resultado = await queryMedidas(idServidorServer, messageServer, res);
        message += '\n' + resultado;
    }

    if(hasFalhasServer){
        resultado = await queryFalhas(idServidorServer, messageServer, res);
        message += '\n' + resultado;
    }

    message += '\n' + messageServer;

    console.log(message)

    const apiMoonAssistant = 'http://127.0.0.1:5555/MoonAssistant/send';
      
    const opcoesReq = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'message': message,
        'idUsuario': idUsuarioServer,
    })
    };
    
    
    fetch(apiMoonAssistant, opcoesReq).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                res.status(200).send(resposta);
            });
        } else {
            console.log(response)
            res.status(204).json('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        res.status(500).json(`Nenhum dado encontrado ou erro na API ${error}`);
    });
}

function getPastMsgs(req, res){
    const idUsuario = req.query.idUsuario;

    MoonAssistantModel.getPastMsgs(idUsuario).then((response)=>{
        if (response.length > 0) {
            res.status(200).send(JSON.stringify(response));
        } else {
            console.log(response)
            res.status(204).json('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        res.status(500).json(`Nenhum dado encontrado ou erro na API ${error}`);
    });
}

module.exports = {
    send,
    getPastMsgs
}
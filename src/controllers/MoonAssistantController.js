const medidaModel = require("../models/medidaModel");
const alertasModel = require("../models/alertasModel");

const formatarData = (data)=>{
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    
    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
}

function send(req, res){
    let hasMonitoramentoServer = req.body.hasMonitoramentoServer;
    let hasFalhasServer = req.body.hasFalhasServer;
    let messageServer = req.body.messageServer;
    let idServidorServer = req.body.idServidorServer;

    let message = "";

    if(hasMonitoramentoServer){
        medidaModel.plotarGrafico(idServidorServer, 100).then(function (resultado) {
            if (resultado.length > 0 && (resultado.length + messageServer.length) < 5000) {
                message += '\n' + JSON.stringify(resultado);
            }else if((resultado.length + messageServer.length) >= 5000){
                res.status(500).send("Texto Muito Longo")
            } 
            else {
                res.status(500).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro);
            res.status(500).json(erro);
        }); 
    }

    if(hasFalhasServer){
        let dataAtual = new Date();
        dataInic = formatarData(dataAtual);
    
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        dataFinal = formatarData(dataAtual);

        alertasModel.totalPDia(dataFinal, dataInic, idServidorServer).then(function (resultado) {
            if (resultado.length > 0 && (resultado.length + messageServer.length) < 5000) {
                message += '\n' + JSON.stringify(resultado);
            }else if((resultado.length + messageServer.length) >= 5000){
                res.status(500).send("Texto Muito Longo")
            } 
            else {
                res.status(500).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro);
            res.status(500).json(erro);
        }); 
    }

    message += '\n' + messageServer;

    const apiMoonAssistant = 'http://127.0.0.1:5555/MoonAssistant/send';
      
    const opcoesReq = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'message': message,
    })
    };
    
    fetch(apiMoonAssistant, opcoesReq).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                res.status(200).send(resposta);
            });
        } else {
            console.log(response)
            res.status(204).send('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        res.status(500).send(`Nenhum dado encontrado ou erro na API ${error}`);
    });
}

module.exports = {
    send
}
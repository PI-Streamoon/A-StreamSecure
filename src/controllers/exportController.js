const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var {jsPDF} = require('jspdf');
require('jspdf-autotable');
const temp = require('temp');
const fs = require('fs');

var medidaModel = require("../models/medidaModel");
var alertasModel = require("../models/alertasModel");
 

async function createTempCsvFile(data) {
    const tempFilePath = temp.path({ suffix: '.csv' });

    const keys = Object.keys(data[0]);
    var header = [];

    keys.forEach((key)=>{
        header.push({
            id: String(key), title: key.toUpperCase()
        });
    });
  
    const csvWriter = createCsvWriter({
      path: tempFilePath,
      header: header,
    });
  
    await csvWriter.writeRecords(data);
    return tempFilePath;
}

function createPDFFile(data){
    const doc = new jsPDF();
    
    var body = [];

    data.forEach((linha)=>{
        body.push([linha.Dia, "CPU", linha.QuantFalhasCPU, linha.QuantFalhasCriticoCPU]);
        body.push(['', "Memoria", linha.QuantFalhasMemoria, linha.QuantFalhasCriticoMemoria]);
        body.push(['', "Disco", linha.QuantFalhasDisco, linha.QuantFalhasCriticoDisco]);
        body.push(['', "Upload", linha.QuantFalhasUpload, linha.QuantFalhasCriticoUpload]);
        body.push(['', "Download", linha.QuantFalhasDownload, linha.QuantFalhasCriticoDownload]);
        body.push(['', "Frequencia CPU", linha.QuantFalhasFreqCpu, linha.QuantFalhasCriticoFreqCpu]);
    })

    doc.autoTable({
        theme: 'grid',
        head: [['Dia', 'Componente', 'Falhas', 'Falhas Criticas'],],
        body: body,
    })

    return doc;
}

function exportCSV(req, res){
    const idServidor = req.query.idServidor;

    temp.track(); 

    medidaModel.plotarGrafico(idServidor, 900000).then(function (resultado) {
        if (resultado.length > 0) {

            createTempCsvFile(resultado)
            .then((tempFilePath) => {
                console.log(`Arquivo CSV temporário criado em: ${tempFilePath}`)

                const fileStream = fs.createReadStream(tempFilePath);
                const chunks = [];
                fileStream.on('data', chunk => chunks.push(chunk));
                fileStream.on('end', () => {
                    const csvData = Buffer.concat(chunks).toString('utf-8');
                    res.status(200).json(csvData);
                })

            })
            .catch(err => console.error('Erro ao criar o arquivo CSV temporário', err));


        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });    
}

const formatarData = (data)=>{
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    
    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
}

function exportPDF(req, res){
    const idServidor = req.query.idServidor;

    let dataAtual = new Date();
    dataInic = formatarData(dataAtual);

    dataAtual.setMonth(dataAtual.getMonth() - 1);
    dataFinal = formatarData(dataAtual);



    alertasModel.totalPDia(dataFinal, dataInic, idServidor).then(function (resultado) {
        if (resultado.length > 0) {

            var pdf = createPDFFile(resultado);
            res.status(200).json({pdf: pdf.output()});

        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });    
}



module.exports = {
    exportCSV,
    exportPDF
};

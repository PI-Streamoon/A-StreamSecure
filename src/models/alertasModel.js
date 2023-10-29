var database = require("../database/config");

function total(dataInic, dataFinal){
    const instrucao = `
    
    SELECT idServidor,
    MAX(MomentoRegistro),
    SUM(nivelFalhaCPU = 1) AS QuantFalhasCPU,
    SUM(nivelFalhaMemoria = 1) AS QuantFalhasMemoria,
    SUM(nivelFalhaDisco = 1) AS QuantFalhasDisco,
    SUM(nivelFalhaUpload = 1) AS QuantFalhasUpload,
    SUM(nivelFalhaDownload = 1) AS QuantFalhasDownload,
    SUM(nivelFalhaCPU = 2) AS QuantFalhasCriticoCPU,
    SUM(nivelFalhaMemoria = 2) AS QuantFalhasCriticoMemoria,
    SUM(nivelFalhaDisco = 2) AS QuantFalhasCriticoDisco,
    SUM(nivelFalhaUpload = 2) AS QuantFalhasCriticoUpload,
    SUM(nivelFalhaDownload = 2) AS QuantFalhasCriticoDownload
    FROM falhascolunas
    WHERE MomentoRegistro >= '${dataInic} 23:59:59' AND MomentoRegistro <= '${dataFinal} 23:59:59'
    GROUP BY idServidor;

    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function geralPDia(dataInic, dataFinal, idServidor){

    const instrucao = `
    SELECT idServidor,
    DATE_FORMAT(DATE(MomentoRegistro), "%d/%m/%Y") AS Dia,
    SUM((nivelFalhaCPU = 1) + (nivelFalhaMemoria = 1) + (nivelFalhaDisco = 1) + (nivelFalhaUpload = 1) + (nivelFalhaDownload = 1)) AS TotalFalhas,
    SUM((nivelFalhaCPU = 2) + (nivelFalhaMemoria = 2) + (nivelFalhaDisco = 2) + (nivelFalhaUpload = 2) + (nivelFalhaDownload = 2)) AS TotalFalhasCriticas
    FROM falhascolunas
    WHERE MomentoRegistro >= '${dataInic} 23:59:59' AND MomentoRegistro <= '${dataFinal} 23:59:59' AND idServidor = ${idServidor}
    GROUP BY Dia;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}



module.exports = {
    geralPDia,
    total
}
var database = require("../database/config");

function seteDias(nivelFalhas, idServidor="'' OR TRUE"){
    const instrucao = `
    
    SELECT idServidor,
    MomentoRegistro, 
    SUM(nivelFalhaCPU = ${nivelFalhas}) AS QuantFalhasCPU,
    SUM(nivelFalhaMemoria = ${nivelFalhas}) AS QuantFalhasMemoria,
    SUM(nivelFalhaDisco = ${nivelFalhas}) AS QuantFalhasDisco,
    SUM(nivelFalhaUpload = ${nivelFalhas}) AS QuantFalhasUpload,
    SUM(nivelFalhaDownload = ${nivelFalhas}) AS QuantFalhasDownload
    FROM falhascolunas
    WHERE idServidor = ${idServidor}
    GROUP BY YEARWEEK(MomentoRegistro, 1);
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function total(dataInic, dataFinal){
    const instrucao = `
    
    SELECT idServidor,
    DATE(MomentoRegistro),
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
    WHERE MomentoRegistro >= '2023-10-19 23:59:59' AND MomentoRegistro <= '2023-10-26 23:59:59'
    GROUP BY idServidor, DATE(MomentoRegistro);

    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}



module.exports = {
    seteDias,
    total
}
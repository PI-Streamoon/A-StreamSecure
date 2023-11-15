var database = require("../database/config");

function total(dataInic, dataFinal){
    const instrucao = `
    
    SELECT idServidor,
    SUM((nivelFalhaCPU = 1) + (nivelFalhaMemoria = 1) + (nivelFalhaDisco = 1) + (nivelFalhaUpload = 1) + (nivelFalhaDownload = 1) + (nivelFalhaFreqCpu = 1)) AS TotalFalhas,
    SUM((nivelFalhaCPU = 2) + (nivelFalhaMemoria = 2) + (nivelFalhaDisco = 2) + (nivelFalhaUpload = 2) + (nivelFalhaDownload = 2) + (nivelFalhaFreqCpu = 2)) AS TotalFalhasCriticas
    FROM falhasColunas
    WHERE MomentoRegistro >= '${dataInic} 23:59:59' AND MomentoRegistro <= '${dataFinal} 23:59:59'
    GROUP BY idServidor;

    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function totalPDia(dataInic, dataFinal, idServidor){

    const instrucao = `
    SELECT idServidor,
    DATE_FORMAT(DATE(MomentoRegistro), "%d/%m/%Y") AS Dia,
    SUM(nivelFalhaCPU = 1) AS QuantFalhasCPU,
    SUM(nivelFalhaMemoria = 1) AS QuantFalhasMemoria,
    SUM(nivelFalhaDisco = 1) AS QuantFalhasDisco,
    SUM(nivelFalhaUpload = 1) AS QuantFalhasUpload,
    SUM(nivelFalhaDownload = 1) AS QuantFalhasDownload,
    SUM(nivelFalhaFreqCpu = 1) AS QuantFalhasFreqCpu,
    SUM(nivelFalhaCPU = 2) AS QuantFalhasCriticoCPU,
    SUM(nivelFalhaMemoria = 2) AS QuantFalhasCriticoMemoria,
    SUM(nivelFalhaDisco = 2) AS QuantFalhasCriticoDisco,
    SUM(nivelFalhaUpload = 2) AS QuantFalhasCriticoUpload,
    SUM(nivelFalhaDownload = 2) AS QuantFalhasCriticoDownload,
    SUM(nivelFalhaFreqCpu = 2) AS QuantFalhasCriticoFreqCpu
    FROM falhasColunas
    WHERE MomentoRegistro >= '${dataInic} 23:59:59' AND MomentoRegistro <= '${dataFinal} 23:59:59' AND idServidor = ${idServidor}
    GROUP BY idServidor, Dia;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}

function realTime(){
    const instrucao = `
        SELECT idServidor,
        MAX(MomentoRegistro) AS MomentoRegistro,
        nivelFalhaCPU AS CPU,
        nivelFalhaMemoria AS Memoria,
        nivelFalhaDisco AS Disco,
        nivelFalhaUpload AS Upload,
        nivelFalhaDownload AS Download
        FROM falhasColunas
        GROUP BY idServidor, MomentoRegistro, CPU, Memoria, Disco, Upload, Download
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function geralPDia(dataInic, dataFinal, idServidor){

    const instrucao = `
    SELECT idServidor,
    DATE_FORMAT(DATE(MomentoRegistro), "%d/%m/%Y") AS Dia,
    SUM((nivelFalhaCPU = 1) + (nivelFalhaMemoria = 1) + (nivelFalhaDisco = 1) + (nivelFalhaUpload = 1) + (nivelFalhaDownload = 1) + (nivelFalhaFreqCpu = 1)) AS TotalFalhas,
    SUM((nivelFalhaCPU = 2) + (nivelFalhaMemoria = 2) + (nivelFalhaDisco = 2) + (nivelFalhaUpload = 2) + (nivelFalhaDownload = 2) + (nivelFalhaFreqCpu = 2)) AS TotalFalhasCriticas
    FROM falhasColunas
    WHERE MomentoRegistro >= '${dataInic} 23:59:59' AND MomentoRegistro <= '${dataFinal} 23:59:59' AND idServidor = ${idServidor}
    GROUP BY idServidor, Dia;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
    
}



module.exports = {
    realTime,
    geralPDia,
    totalPDia,
    total
}
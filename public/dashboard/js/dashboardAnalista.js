const dashboardCpu = document.getElementById('dashboardCpu');
const dashboardMemory = document.getElementById('dashboardMemory');
const dashboardDisk = document.getElementById('dashboardDisk');
const dashboardUpload = document.getElementById('dashboardUpload');
const dashboardDownload = document.getElementById('dashboardDownload');
const dashboardFreq = document.getElementById('dashboardFreq');
const cpuBanner = document.getElementById('cpuBanner');
const memoryBanner = document.getElementById('memoryBanner');
const diskBanner = document.getElementById('diskBanner');
const uploadBanner = document.getElementById('uploadBanner');
const downloadBanner = document.getElementById('downloadBanner');
const freqBanner = document.getElementById('freqBanner');
const filtroDataInic = document.getElementById('filtroDataInic');
const filtroDataFinal = document.getElementById('filtroDataFinal');
const dashTitle = document.getElementById('dashTitle');

var idServidorSelecionado = 1;

var labelsGeral = [];
var dadosGeral = [];
var dashboardGeral;

var labelsCpuPorcentagem = []
var dadosCpuPorcentagem = []
var dashboardCpuPorcentagem;

var labelsRamPorcentagem = []
var dadosRamPorcentagem = []
var dashboardRamPorcentagem;

var labelsDiscoPorcentagem = []
var dadosDiscoPorcentagem = []
var dashboardDiscoPorcentagem; 

var labelsUploadKilobytes = []
var dadosUploadKilobytes = []
var dashboardUploadKilobytes;

var labelsDownloadKilobytes = []
var dadosDownloadKilobytes = []
var dashboardDownloadKilobytes;

var labelsFrequenciaMegahertz = []
var dadosFrequenciaMegahertz = []
var dashboardFrequenciaMegahertz;



Chart.defaults.color = "#ffffff";

// setInterval(atualizarGraficoCpuPorcentagem, 3000)
// setInterval(atualizarGraficoRamPorcentagem, 3000)
// setInterval(atualizarGraficoDiscoPorcentagem, 3000)
// setInterval(atualizarGraficoUpload, 3000)
// setInterval(atualizarGraficoDownload, 3000)
// setInterval(atualizarGraficoFrequencia, 3000)

function atualizarGraficoGeral() {
    const {dataInic, dataFinal} = dataMachineVisible();

    console.warn(`/alertas/geralPDia?dataInic=${dataInic}&dataFinal=${dataFinal}&idServidor=${idServidorSelecionado}`)

    fetch(`/alertas/geralPDia?dataInic=${dataInic}&dataFinal=${dataFinal}&idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    labelsGeral.push(registro.Dia);
                    dadosGeral.datasets[0].data.push(registro.TotalFalhas);
                    dadosGeral.datasets[1].data.push(registro.TotalFalhasCriticas);
                }

                dashboardGeral.update()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoCpuPorcentagem() {
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                
                    var registro = resposta[0];
                    labelsCpuPorcentagem.push(registro.dtHora);
                    dadosCpuPorcentagem.datasets[0].data.push(registro.CPU);
                    infoCPU.innerHTML = registro.CPU+"%";
                    infoRAM.innerHTML = registro.Memoria+"%";
                    infoDisco.innerHTML = registro.Disco+"%";
                    infoUpload.innerHTML = registro.Upload+" Kb/s";
                    infoDownload.innerHTML = registro.Download+" Kb/s";
                    infoFrequencia.innerHTML = registro.FrequenciaCPU+" MHz"
                
                    gerarRelatorio()

                if (labelsCpuPorcentagem.length > 10) {
                    labelsCpuPorcentagem.shift()
                    dadosCpuPorcentagem.datasets[0].data.shift()
                } 

                dashboardCpuPorcentagem.update()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoRamPorcentagem() {
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                console.log(resposta)

                for (var i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    labelsRamPorcentagem.push(registro.dtHora);
                    dadosRamPorcentagem.datasets[0].data.push(registro.Memoria);
                }

                if (labelsRamPorcentagem.length > 10) {
                    labelsRamPorcentagem.shift()
                    dadosRamPorcentagem.datasets[0].data.shift()
                } 

                dashboardRamPorcentagem.update()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoDiscoPorcentagem() {
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                console.log(resposta)

                for (var i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    labelsDiscoPorcentagem.push(registro.dtHora);
                    dadosDiscoPorcentagem.datasets[0].data.push(registro.Disco);
                }

                if (labelsDiscoPorcentagem.length > 10) {
                    labelsDiscoPorcentagem.shift()
                    dadosDiscoPorcentagem.datasets[0].data.shift()
                } 

                dashboardDiscoPorcentagem.update()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoUpload() {
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                console.log(resposta)

                for (var i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    labelsUploadKilobytes.push(registro.dtHora);
                    dadosUploadKilobytes.datasets[0].data.push(registro.Upload);
                }

                if (labelsUploadKilobytes.length > 10) {
                    labelsUploadKilobytes.shift()
                    dadosUploadKilobytes.datasets[0].data.shift()
                } 

                dashboardUploadKilobytes.update()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
} 

function atualizarGraficoDownload() {
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                console.log(resposta)

                for (var i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    labelsDownloadKilobytes.push(registro.dtHora);
                    dadosDownloadKilobytes.datasets[0].data.push(registro.Download);
                }

                if (labelsDownloadKilobytes.length > 10) {
                    labelsDownloadKilobytes.shift()
                    dadosDownloadKilobytes.datasets[0].data.shift()
                } 

                dashboardDownloadKilobytes.update()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoFrequencia() {
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                console.log(resposta)

                for (var i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    labelsFrequenciaMegahertz.push(registro.dtHora);
                    dadosFrequenciaMegahertz.datasets[0].data.push(registro.FrequenciaCPU);
                }

                if (labelsFrequenciaMegahertz.length > 10) {
                    labelsFrequenciaMegahertz.shift()
                    dadosFrequenciaMegahertz.datasets[0].data.shift()
                } 

                dashboardFrequenciaMegahertz.update()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
// Dashboard Geral

labelsGeral = []
dadosGeral = {
labels: labelsGeral,
datasets: [{
    label: "Falhas",
    data: [],
    backgroundColor: "rgba(255, 255, 0, 0.7)"
},
{
    label: "Falhas Críticas",
    data: [],
    backgroundColor: "rgba(255, 0, 0, 0.7)"
}]
}

dashboardGeral = new Chart(document.getElementById(`dashboardGeral`), {
    type: "bar",
    data: dadosGeral,
    options: {
        scales: {
            y: {
                min: 0,
                max: 100,
            }
        },
        responsive: true
    }
});

// Dashboard CPU

labelsCpuPorcentagem = []
dadosCpuPorcentagem = {
    labels: labelsCpuPorcentagem,
    datasets: [{
        label: "CPU Porcentagem",
        data: [],
        backgroundColor: "#000000",
        borderColor: "#6248AE"
    }]
}

dashboardCpuPorcentagem = new Chart(dashboardCpu, {
    type: "line",
    data: dadosCpuPorcentagem,
    options: {
        scales: {
            y: {
                min: 0,
                max: 100
            }
        },
        responsive: true
    }
});

// Dashboard Memoria

labelsRamPorcentagem = []
dadosRamPorcentagem = {
    labels: labelsRamPorcentagem,
    datasets: [{
        label: "RAM Porcentagem",
        data: [],
        backgroundColor: "#000000",
        borderColor: "#6248AE"
    }]
}

dashboardRamPorcentagem = new Chart(dashboardMemory, {
    type: "line",
    data: dadosRamPorcentagem,
    options: {
        scales: {
            y: {
                min: 0,
                max: 100
            }
        },
        responsive: true
    }
});

// Dashboard Disco
labelsDiscoPorcentagem = []
dadosDiscoPorcentagem = {
    labels: labelsDiscoPorcentagem,
    datasets: [{
        label: "Disco Porcentagem",
        data: [],
        backgroundColor: "#000000",
        borderColor: "#6248AE"
    }]
}

dashboardDiscoPorcentagem = new Chart(dashboardDisk, {
    type: "line",
    data: dadosDiscoPorcentagem,
    options: {
        responsive: true
    }
});

// Dashboard Upload
labelsUploadKilobytes = []
dadosUploadKilobytes = {
    labels: labelsUploadKilobytes,
    datasets: [{
        label: "Upload KiloBytes",
        data: [],
        backgroundColor: "#000000",
        borderColor: "#6248AE"
    }]
}

dashboardUploadKilobytes = new Chart(dashboardUpload, {
    type: "line",
    data: dadosUploadKilobytes,
    options: {
        responsive: true
    }
});

// Dashboard Download
labelsDownloadKilobytes = []
dadosDownloadKilobytes = {
    labels: labelsDownloadKilobytes,
    datasets: [{
        label: "Download KiloBytes",
        data: [],
        backgroundColor: "#000000",
        borderColor: "#6248AE"
    }]
}

dashboardDownloadKilobytes = new Chart(dashboardDownload, {
    type: "line",
    data: dadosDownloadKilobytes,
    options: {
        responsive: true
    }
});

// Dashboard Frequência
labelsFrequenciaMegahertz = []
dadosFrequenciaMegahertz = {
    labels: labelsFrequenciaMegahertz,
    datasets: [{
        label: "Frequência Megahertz",
        data: [],
        backgroundColor: "#000000",
        borderColor: "#6248AE"
    }]
}

dashboardFrequenciaMegahertz = new Chart(dashboardFreq, {
    type: "line",
    data: dadosFrequenciaMegahertz,
    options: {
        responsive: true
    }
});
    

function change() {
    dashboardCpu.classList.add(`invisivel`)
    dashboardMemory.classList.add(`invisivel`)
    dashboardDisk.classList.add(`invisivel`)
    dashboardUpload.classList.add(`invisivel`)
    dashboardDownload.classList.add(`invisivel`)
    dashboardFreq.classList.add(`invisivel`)
}

function showCpu() {
    dashboardCpu.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = `Servidor ${idServidorSelecionado} - Uso da CPU (%)`
}

function showMemory() {
    dashboardMemory.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = `Servidor ${idServidorSelecionado} - Uso da Memória (%)`
}

function showDisk() {
    dashboardDisk.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = `Servidor ${idServidorSelecionado} - Uso do Disco (%)`
}

function showUpload() {
    dashboardUpload.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = `Servidor ${idServidorSelecionado} - Velocidade de Upload (Kb / s)`
}

function showDownload() {
    dashboardDownload.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = `Servidor ${idServidorSelecionado} - Velocidade de Download (Kb / s)`
}

function showFreq() {
    dashboardFreq.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = `Servidor ${idServidorSelecionado} - Frequência da CPU (Mhz)`
}


function gerarRelatorio() {
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();    
                        
                var registro = resposta[0];
                
                CpuTotal.innerHTML = `${registro.CPU} %`;
                Freq.innerHTML = `${registro.FrequenciaCPU} MHz`;
                Disco.innerHTML = `${registro.Disco} %`;
                MemPercent.innerHTML = `${registro.Memoria} %`;
                MenTotal.innerHTML = `${registro.MemoriaTotal} GB`;
                MenUsada.innerHTML = `${registro.MemoriaUsada} GB`;
                MenLivre.innerHTML = `${Number((registro.MemoriaTotal - registro.MemoriaUsada).toFixed(1))} GB`
                Download.innerHTML = `${registro.Download} Kb/s`;
                Upload.innerHTML = `${registro.Upload} Kb/s`;

                registroCPU = registro.CPU
                registroDisco = registro.Disco
                registroMemoria = registro.Memoria
                registroDownload = registro.Download
                registroUpload = registro.Upload

                atualizarEstadoDoServidor(registroCPU, registroDisco, registroMemoria)
               
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function carregarPagina() {
    const formatarData = (dataAtual)=>{
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        
        const dataFormatada = `${ano}-${mes}-${dia}`;

        return dataFormatada;
    }


    var dataAtual = new Date();
    var dataMenosUmaSemana = new Date()
    dataMenosUmaSemana.setTime(dataAtual.getTime() - 604800000)
    
    dataMenosUmaSemana = formatarData(dataMenosUmaSemana)
    dataAtual = formatarData(dataAtual);

    filtroDataInic.value = dataHumanVisible(dataMenosUmaSemana);
    filtroDataFinal.value = dataHumanVisible(dataAtual);
    
    atualizarPagina(dataMenosUmaSemana, dataAtual);
}

function dataHumanVisible(data){
    return data.split('-').reverse().join('-');
}

function dataMachineVisible(){
    let dataInic = filtroDataInic.value.split('-').reverse().join('-');
    let dataFinal = filtroDataFinal.value.split('-').reverse().join('-');

    return {dataInic: dataInic, dataFinal: dataFinal};
}

function atualizarEstadoDoServidor(){
    const setServerStatus = (element, estado)=>{
        element.innerHTML = estado
        element.classList.add(estado)
    }
    
    const delAllStatus = ()=>{
        cpuBanner.classList.remove("banner-critico", "banner-alerta")
        memoryBanner.classList.remove("banner-critico", "banner-alerta")
        diskBanner.classList.remove("banner-critico", "banner-alerta")
        uploadBanner.classList.remove("banner-critico", "banner-alerta")
        downloadBanner.classList.remove("banner-critico", "banner-alerta")
    }

    const setBannerStatus = (linha)=>{
        let estado = 'normal';

        delAllStatus();

        if (linha.CPU >= 90){
            estado = "critico"
            cpuBanner.classList.add("banner-critico")
        }else if(linha.CPU >= 70){
            estado = estado != "critico" ? "alerta" : estado
            cpuBanner.classList.add("banner-alerta")
        }else{
            cpuBanner.classList.remove("banner-critico")
            cpuBanner.classList.remove("banner-alerta")
        }

        if (linha.Memoria >= 90){
            estado = "critico"
            memoryBanner.classList.add("banner-critico")
        }else if(linha.Memoria >= 70){
            estado = estado != "critico" ? "alerta" : estado
            memoryBanner.classList.add("banner-alerta")
        }else{
            memoryBanner.classList.remove("banner-critico")
            memoryBanner.classList.remove("banner-alerta")
        }

        if (linha.Disco >= 90){
            estado = "critico"
            diskBanner.classList.add("banner-critico")
        }else if(linha.Disco >= 70){
            estado = estado != "critico" ? "alerta" : estado
            diskBanner.classList.add('banner-alerta')
        }else{
            diskBanner.classList.remove("banner-critico")
            diskBanner.classList.remove("banner-alerta")
        }

            
        if (linha.Upload >= 100){
            estado = "critico" 
            uploadBanner.classList.add("banner-critico")
        }else if(linha.Upload >= 80){
            estado = estado != "critico" ? "alerta" : estado
            uploadBanner.classList.add("banner-alerta")
        }else{
            uploadBanner.classList.remove("banner-critico")
            uploadBanner.classList.remove("banner-alerta")
        }

            
        if (linha.Download >= 400){
            estado = "critico"
            downloadBanner.classList.add("banner-critico")
        }else if(linha.Download >= 350){
            estado = estado != "critico" ? "alerta" : estado
            downloadBanner.classList.add("banner-alerta")
        }else{
            downloadBanner.classList.remove("banner-critico")
            downloadBanner.classList.remove("banner-alerta")
        }

        return estado;
    }

    fetch(`/medidas/ultimas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();

                resposta.forEach((linha)=>{
                    // Crítico
                    let estadoServidor = document.getElementById(`estadoServidor-${linha.idServidor}`);

                    console.warn(linha)
                    
                    let estado = setBannerStatus(linha);
                    setServerStatus(estadoServidor, estado);
                })
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function trocarNomesServidor(nomeFuturo){
    var nomesServidor = document.querySelectorAll('[data-id="nomeServidor"]')

    nomesServidor.forEach((textosTag) => {
        textosTag.innerText = `${nomeFuturo}: ${filtroDataInic.value} à ${filtroDataFinal.value}`;
    })
}

function trocarServidor(idServidor){
    trocarNomesServidor(`Servidor ${idServidor}`);

    idServidorSelecionado = idServidor;
}


async function listarFalhasServidores(dataInic, dataFinal) {
    dashTitle.innerText = `Lista de Servidores e Falhas Entre ${dataHumanVisible(dataInic)} - ${dataHumanVisible(dataFinal)}`;
    trocarNomesServidor(`Servidor ${idServidorSelecionado}`);

    listagemDosServidores.innerHTML = "";
    return new Promise((resolve, reject)=>{
        fetch(`/alertas/total?dataInic=${dataInic}&dataFinal=${dataFinal}`)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                        var listaIdServidores = resposta

                        if(idServidorSelecionado == 1){
                            trocarServidor(listaIdServidores[0].idServidor);
                        }


                        for (let i = 0; i < resposta.length; i++) {
                            let linha = resposta[i];

                            let idServidor = linha.idServidor

                            let totalFalhas = 0;
                            let totalFalhasCriticos = 0;
                            

                            totalFalhas +=  parseInt(linha.QuantFalhasCPU);
                            totalFalhas += parseInt(linha.QuantFalhasMemoria);
                            totalFalhas += parseInt(linha.QuantFalhasDisco);
                            totalFalhas += parseInt(linha.QuantFalhasUpload);
                            totalFalhas += parseInt(linha.QuantFalhasDownload);

                            totalFalhasCriticos +=  parseInt(linha.QuantFalhasCriticoCPU);
                            totalFalhasCriticos +=  parseInt(linha.QuantFalhasCriticoMemoria);
                            totalFalhasCriticos +=  parseInt(linha.QuantFalhasCriticoDisco);
                            totalFalhasCriticos +=  parseInt(linha.QuantFalhasCriticoUpload);
                            totalFalhasCriticos +=  parseInt(linha.QuantFalhasCriticoDownload);
                            
                            listagemDosServidores.innerHTML += `
                                <tr class="bordaBaixo" onclick="trocarServidor(${idServidor})">
                                    <th scope="row">${i + 1}</th>
                                    <td id="nomeServidor-${idServidor}"> Servidor ${idServidor}</td>
                                    <td class="Alerta">${totalFalhas}</td>
                                    <td class="Critico">${totalFalhasCriticos}</td>
                                </tr>`

                            resolve(true)
                        }
                    });
                } else {
                    console.error("Nenhum dado encontrado");
                    reject(false)
                }
            })
            .catch(function (error) {
                console.error(
                    `Erro na obtenção dos dados p/ locais dos servidores: ${error.message}`
                );
                reject(false)
            });
    });
       
}


function filtroDataEvent(){
    const {dataInic, dataFinal} = dataMachineVisible();

    timeInic = Date.parse(dataInic);
    timeFinal = Date.parse(dataFinal);

    if(!isNaN(timeInic) && !isNaN(timeFinal) && timeInic < timeFinal){
        atualizarPagina(dataInic, dataFinal);
    }
}

async function atualizarPagina(dataInic, dataFinal){
    let onSucess = await listarFalhasServidores(dataInic, dataFinal);
    if(onSucess){
        atualizarGraficoGeral();
    }
}
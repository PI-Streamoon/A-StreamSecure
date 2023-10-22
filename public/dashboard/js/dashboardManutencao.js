const dashboardCpu = document.getElementById('dashboardCpu');
const dashboardMemory = document.getElementById('dashboardMemory');
const dashboardDisk = document.getElementById('dashboardDisk');
const dashboardUpload = document.getElementById('dashboardUpload');
const dashboardDownload = document.getElementById('dashboardDownload');
const dashboardFreq = document.getElementById('dashboardFreq');

var idServidorSelecionado;

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


(function ($) {
    "use strict";

    Chart.defaults.color = "#ffffff";

    setInterval(atualizarGraficoGeral, 6000)
    setInterval(atualizarGraficoCpuPorcentagem, 3000)
    setInterval(atualizarGraficoRamPorcentagem, 3000)
    setInterval(atualizarGraficoDiscoPorcentagem, 3000)
    setInterval(atualizarGraficoUpload, 3000)
    setInterval(atualizarGraficoDownload, 3000)
    setInterval(atualizarGraficoFrequencia, 3000)

    function atualizarGraficoGeral() {
        fetch(`/medidas/geral?idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
    
                    for (var i = 0; i < resposta.length; i++) {
                        var registro = resposta[i];
                        labelsGeral.push(registro.dtHora);
                        dadosGeral.datasets[0].data.push(registro.CPU);
                        dadosGeral.datasets[1].data.push(registro.Memoria);
                        dadosGeral.datasets[2].data.push(registro.Disco);
                    }

                    if (labelsGeral.length > 5) {
                        labelsGeral.shift()
                        dadosGeral.datasets[0].data.shift()
                        dadosGeral.datasets[1].data.shift()
                        dadosGeral.datasets[2].data.shift()
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
        label: "Uso da CPU",
        data: [],
        backgroundColor: "#6248AE"
    },
    {
        label: "Uso da Memória",
        data: [],
        backgroundColor: "#0d6efd"
    },
    {
        label: "Uso do Disco",
        data: [],
        backgroundColor: "#d63384"
    }],
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
    

    
})(jQuery);

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

function servidor1() {
    window.location.assign(`dashboardManutencaoSem.html`);
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

function carregarPagina(idUsuario) {
    fetch(`/Perfil/Perfil/${idUsuario}`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                // console.log("Dados recebidos: ", JSON.stringify(resposta));
                infos = resposta[0]
                var nome = document.getElementById("nomeUsuario");
                nome.innerHTML = infos.nome;
                var Foto = document.getElementById("usuarioFoto");
                Foto.src = `assets/img/fotosUsuarios/${infos.foto}`;
                sessionStorage.FOTO = infos.foto;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function atualizarEstadoDoServidor(registroCPU, registroDisco, registroMemoria){

    var mediaServidor = (registroCPU + registroDisco + registroMemoria) / 3
    if(mediaServidor <= 55){
        estadoServidor0.innerHTML = `Normal`;
        document.getElementById(`estadoServidor0`).classList.remove("alerta")
        document.getElementById("estadoServidor0").classList.remove("critico")
        document.getElementById("estadoServidor0").classList.add("normal")
    } else if(mediaServidor <= 58){
        estadoServidor0.innerHTML = `Alerta`;
        document.getElementById("estadoServidor0").classList.remove("normal")
        document.getElementById("estadoServidor0").classList.remove("critico")
        document.getElementById("estadoServidor0").classList.add("alerta")
    } else {
        estadoServidor0.innerHTML = `Crítico`;
        document.getElementById("estadoServidor0").classList.remove("alerta")
        document.getElementById("estadoServidor0").classList.remove("normal")
        document.getElementById("estadoServidor0").classList.add("critico")
    }

    if(mediaServidor*0.90 <= 55){
        estadoServidor1.innerHTML = `Normal`;
        document.getElementById(`estadoServidor1`).classList.remove("alerta")
        document.getElementById("estadoServidor1").classList.remove("critico")
        document.getElementById("estadoServidor1").classList.add("normal")
    } else if(mediaServidor*0.90 <= 58){
        estadoServidor1.innerHTML = `Alerta`;
        document.getElementById("estadoServidor1").classList.remove("normal")
        document.getElementById("estadoServidor1").classList.remove("critico")
        document.getElementById("estadoServidor1").classList.add("alerta")
    } else {
        estadoServidor1.innerHTML = `Crítico`;
        document.getElementById("estadoServidor1").classList.remove("alerta")
        document.getElementById("estadoServidor1").classList.remove("normal")
        document.getElementById("estadoServidor1").classList.add("critico")
    }
}

function trocarNomesServidor(nomeAtual, nomeFuturo){
    var nomesServidor = document.querySelectorAll('[data-id="nomeServidor"]')

    nomesServidor.forEach((textosTag) => {
        textosTag.innerText = textosTag.innerText.replace(nomeAtual, nomeFuturo);
    })
}

function trocarServidor(element){
    var firstTd = element.querySelector("td");


    let idServidor = firstTd.dataset.idServidor;

    trocarNomesServidor(`Servidor ${idServidorSelecionado}`, `Servidor ${idServidor}`);

    idServidorSelecionado = idServidor;
}


function listarServidores() {

    fetch(`/servidor/pegarLocal`)
        .then(function (response) {

            if (response.ok) {
                response.json().then(function (resposta) {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    var listaIdServidores = resposta
                    for (let i = 0; i < listaIdServidores.length; i++) {
                        listagemDosServidores.innerHTML += `
                            <tr class="bordaBaixo" onclick="trocarServidor(this)">
                                <th scope="row">${i + 1}</th>
                                <td id="idServidor${i}"></td>
                                <td>${listaIdServidores[i].localidade}</td>
                                <td id="estadoServidor${i}" class=""></td>
                            </tr>`
                    }

                    listarIdServidores();
                });
            } else {
                console.error("Nenhum dado encontrado");
            }
        })
        .catch(function (error) {
            console.error(
                `Erro na obtenção dos dados p/ locais dos servidores: ${error.message}`
            );
        });
        
}  

function listarIdServidores() {

    fetch(`/servidor/pegarId`)
        .then(function (response) {

            if (response.ok) {
                response.json().then(function (resposta) {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    var listaId = resposta

                    idServidorSelecionado = listaId[0].idServidor;

                    trocarNomesServidor("Servidor 1", `Servidor ${idServidorSelecionado}`);

                    for (let i = 0; i < listaId.length; i++) {
                        const idServidorAtual = document.getElementById(`idServidor${i}`)
                        idServidorAtual.innerHTML = `Servidor ${listaId[i].idServidor}`
                        idServidorAtual.dataset.idServidor = listaId[i].idServidor;
                    }
                });
            } else {
                console.error("Nenhum dado encontrado");
            }
        })
        .catch(function (error) {
            console.error(
                `Erro na obtenção dos dados p/ ID's dos servidores: ${error.message}`
            );
        });

}
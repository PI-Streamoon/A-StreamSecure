const dashboardCpu = document.getElementById('dashboardCpu');
const dashboardMemory = document.getElementById('dashboardMemory');
const dashboardDisk = document.getElementById('dashboardDisk');
const dashboardUpload = document.getElementById('dashboardUpload');
const dashboardDownload = document.getElementById('dashboardDownload');
const dashboardFreq = document.getElementById('dashboardFreq');

var labelsGeral = [];
var dadosGeral = [];
var dashboardGeral;

var labelsCpuPorcentagem = []
var dadosCpuPorcentagem = []
var dashboardCpuPorcentagem;

var labelsRamPorcentagem = []
var dadosRamPorcentagem = []
var dashboardRamPorcentagem;

(function ($) {
    "use strict";

    Chart.defaults.color = "#ffffff";

    setInterval(atualizarGraficoGeral, 6000)
    setInterval(atualizarGraficoCpuPorcentagem, 3000)
    setInterval(atualizarGraficoRamPorcentagem, 3000)

    function atualizarGraficoGeral() {
        fetch(`/medidas/geral`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
    
                    for (var i = 0; i < resposta.length; i++) {
                        var registro = resposta[i];
                        labelsGeral.push(registro.dtHora);
                        dadosGeral.datasets[0].data.push(registro.cpu);
                        dadosGeral.datasets[1].data.push(registro.memoria);
                        dadosGeral.datasets[2].data.push(registro.disco);
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
        fetch(`/medidas/ultimas`, { cache: 'no-store' }).then(function (response) {
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
        fetch(`/medidas/ultimas`, { cache: 'no-store' }).then(function (response) {
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
    new Chart(dashboardDisk, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(163,45,163, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(163,45,163, .5)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    });

    // Dashboard Upload
     new Chart(dashboardUpload, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(163,45,163, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(163,45,163, .5)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    });

    // Dashboard Download
    new Chart(dashboardDownload, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(163,45,163, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(163,45,163, .5)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    });

    // Dashboard Frequência
    new Chart(dashboardFreq, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2023"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(163,45,163, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(163,45,163, .5)",
                    fill: true
                }
            ]
            },
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
    dashboardTitle.innerHTML = "Servidor - Uso da CPU (%)"
}

function showMemory() {
    dashboardMemory.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = "Servidor - Uso da Memória (%)"
}

function showDisk() {
    dashboardDisk.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = "Servidor - Uso do Disco (%)"
}

function showUpload() {
    dashboardUpload.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = "Servidor - Velocidade de Upload (Kb / s)"
}

function showDownload() {
    dashboardDownload.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = "Servidor - Velocidade de Download (Kb / s)"
}

function showFreq() {
    dashboardFreq.classList.remove(`invisivel`)
    dashboardTitle.innerHTML = "Servidor - Frequência da CPU (Ghz)"
}

function servidor1() {
    window.location.assign(`dashboardManutencaoSem.html`);
}

function gerarRelatorio() {
    fetch(`/medidas/ultimas`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();    
                        
                var registro = resposta[0];
                
                CpuTotal.innerHTML = `${registro.CPU}%`;
                Freq.innerHTML = `${registro.FrequenciaCPU} MHz`;
                Disco.innerHTML = `${registro.Disco}%`;
                MemPercent.innerHTML = `${registro.Memoria}%`;
                MenTotal.innerHTML = `${registro.MemoriaTotal} GB`;
                MenUsada.innerHTML = `${registro.MemoriaUsada} GB`;
                MenLivre.innerHTML = `${Number((registro.MemoriaTotal - registro.MemoriaUsada).toFixed(1))} GB`
                Download.innerHTML = `${registro.Download} Kb/s`;
                Upload.innerHTML = `${registro.Upload} Kb/s`;                 
               
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
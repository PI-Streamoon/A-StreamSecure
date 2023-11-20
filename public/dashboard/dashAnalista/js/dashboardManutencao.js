// const dashboardCpu = document.getElementById('dashboardCpu');
// const dashboardMemory = document.getElementById('dashboardMemory');
// const dashboardDisk = document.getElementById('dashboardDisk');
// const dashboardUpload = document.getElementById('dashboardUpload');
// const dashboardDownload = document.getElementById('dashboardDownload');
// const dashboardFreq = document.getElementById('dashboardFreq');
// const cpuBanner = document.getElementById('cpuBanner');
// const memoryBanner = document.getElementById('memoryBanner');
// const diskBanner = document.getElementById('diskBanner');
// const uploadBanner = document.getElementById('uploadBanner');
// const downloadBanner = document.getElementById('downloadBanner');
// const freqBanner = document.getElementById('freqBanner');

var idServidorSelecionado;

var labelsGeral = [];
var dadosGeral = [];
var dashboardGeral;

// var labelsCpuPorcentagem = []
// var dadosCpuPorcentagem = []
// var dashboardCpuPorcentagem;

// var labelsRamPorcentagem = []
// var dadosRamPorcentagem = []
// var dashboardRamPorcentagem;

// var labelsDiscoPorcentagem = []
// var dadosDiscoPorcentagem = []
// var dashboardDiscoPorcentagem; 

// var labelsUploadKilobytes = []
// var dadosUploadKilobytes = []
// var dashboardUploadKilobytes;

// var labelsDownloadKilobytes = []
// var dadosDownloadKilobytes = []
// var dashboardDownloadKilobytes;

// var labelsFrequenciaMegahertz = []
// var dadosFrequenciaMegahertz = []
// var dashboardFrequenciaMegahertz;


(function ($) {
    "use strict";

    Chart.defaults.color = "#ffffff";

    setInterval(atualizarGraficoGeral, 6000)

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
    
})(jQuery);


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

function carregarPagina() {
    const formatarData = (dataAtual)=>{
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        
        const dataFormatada = `${ano}-${mes}-${dia}`;

        return dataFormatada;
    }


    var dataAtual = new Date();
    var dataMenosUmaSemana = new Date();
    var dataMenosUmAno = new Date();
    dataMenosUmMes.setTime(dataAtual.getTime() - (604800000*3))
    dataMenosUmAno.setTime(dataAtual.getTime() - (604800000*52))

    dataMenosUmAno  = formatarData(dataMenosUmAno)
    dataMenosUmaSemana = formatarData(dataMenosUmaSemana)
    dataAtual = formatarData(dataAtual);

    filtroDataInic.value = humanVisible(dataMenosUmaSemana);
    filtroDataFinal.value = humanVisible(dataAtual);
    
    listarFalhasServidores(dataMenosUmaSemana, dataAtual);
}


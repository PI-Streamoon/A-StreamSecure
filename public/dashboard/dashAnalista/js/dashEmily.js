const dashboardPredictCpu = document.getElementById('dashboardPredictCpu');
const dashboardPredictUpload = document.getElementById('dashboardPredictUpload');
const graficoTotalMemoria = document.getElementById('totalMemoria');

var labelsPredictCpu = [];
var labelsPredictUpload = [];
var labelsTotalMemoria = [];
var dadosPredictCpu = [];
var dadosPredictUpload = [];
var dadoMemoriaTotal = [];

var dashPredictCpu;
var dashPredictUpload;
var totalMemoria;


// Dashboard Predict CPU
setInterval(predictCPU, 22000)

function predictCPU() {
    fetch(`/predicts/predictCPU`)
        .then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    for (var i = resposta.length - 1; i >= 0; i--) {
                        var dado = resposta[i];
                        labelsPredictCpu.push(dado.dtHora);
                        dadosPredictCpu.datasets[0].data.push(dado.registro);
                        dadosPredictCpu.datasets[1].data.push(dado.dadoPredict);
                    }

                    if (labelsPredictCpu.length > 10) {
                        var newLength = labelsPredictCpu.length - 10;
                        labelsPredictCpu.splice(0, newLength);
                        dadosPredictCpu.datasets[0].data.splice(0, newLength);
                        dadosPredictCpu.datasets[1].data.splice(0, newLength);
                    }

                    dashPredictCpu.update()
                });
            } else { console.error("Nenhum dado encontrado ou erro no fetch"); }
        }).catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ cpu: ${error.message}`);
        }); return false;
}

labelsPredictCpu = []
dadosPredictCpu = {
    labels: labelsPredictCpu,
    datasets: [{
        label: "Dados reais",
        data: [],
        backgroundColor: "rgb(221, 160, 221)",
        borderWidth: 1
    },
    {
        label: "Dados previstos",
        data: [],
        borderColor: "rgb(131,111,255)",
        backgroundColor: "rgb(131,111,255)",
        borderWidth: 1
    }
    ]
}

dashPredictCpu = new Chart(dashboardPredictCpu, {
    type: "line",
    data: dadosPredictCpu,
    options: {
        scales: {
            y: {
                min: 0,
                max: 100,
            }
        },
        responsive: true,
    }
});


// Dashboard Predict Upload
setInterval(predictUpload, 22000)

function predictUpload() {
    fetch(`/predicts/predictUpload`)
        .then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    for (var i = resposta.length - 1; i >= 0; i--) {
                        var dado = resposta[i];
                        labelsPredictUpload.push(dado.dtHora);
                        dadosPredictUpload.datasets[0].data.push(dado.registro);
                        dadosPredictUpload.datasets[1].data.push(dado.dadoPredict);
                    }

                    if (labelsPredictUpload.length > 10) {
                        var newLength = labelsPredictUpload.length - 10;
                        labelsPredictUpload.splice(0, newLength);
                        dadosPredictUpload.datasets[0].data.splice(0, newLength);
                        dadosPredictUpload.datasets[1].data.splice(0, newLength);
                    }

                    dashPredictUpload.update()
                });
            } else { console.error("Nenhum dado encontrado ou erro no fetch"); }
        }).catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ upload: ${error.message}`);
        }); return false;
}

dadosPredictUpload = {
    labels: labelsPredictUpload,
    datasets: [{
        label: "Dados reais",
        data: [],
        backgroundColor: "rgb(221, 160, 221)",
        borderWidth: 1
    },
    {
        label: "Dados previstos",
        data: [],
        borderColor: "rgb(131,111,255)",
        backgroundColor: "rgb(131,111,255)",
        borderWidth: 1
    }
    ]
}

dashPredictUpload = new Chart(dashboardPredictUpload, {
    type: "line",
    data: dadosPredictUpload,
    options: {
        scales: {
            y: {
                min: 0,
                max: 300,
            }
        },
        responsive: true,
    }
});


// Exibição da utilização da memória
setInterval(exibirMemoria, 5000)

function exibirMemoria() {
    fetch(`/predicts/exibirMemoria`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    dadoMemoriaTotal.datasets.forEach(dataset => {
                        dataset.data = [];
                    });

                    for (var i = 0; i < resposta.length; i++) {
                        var dado = resposta[i];
                        dadoMemoriaTotal.datasets[0].data.push(dado.MemoriaUsada);
                        dadoMemoriaTotal.datasets[1].data.push(dado.MemoriaTotal);
                    }

                    totalMemoria.update()
                });
            } else {
                console.error("Nenhum dado encontrado ou erro na API");
            }
        })
        .catch(function (error) {
            console.error(
                `Erro na obtenção dos dados p / memória: ${error.message}`
            );
        });

}

labelsTotalMemoria = []
dadoMemoriaTotal = {
    labels: labelsTotalMemoria,
    datasets: [{
        label: "Espaço Utilizado",
        data: [],
        backgroundColor: "rgb(131,111,255)"
    },
    {
        label: "Espaço disponível",
        data: [],
        backgroundColor: "rgb(221, 160, 221)"
    }]
}

totalMemoria = new Chart(graficoTotalMemoria, {
    type: 'pie',
    data: dadoMemoriaTotal
});
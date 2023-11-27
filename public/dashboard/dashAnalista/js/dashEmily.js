const dashboardPredictCpu = document.getElementById('dashboardPredictCpu');
const dashboardPredictUpload = document.getElementById('dashboardPredictUpload');
const graficoTotalMemoria = document.getElementById('totalMemoria');
const graficoInfoDisco = document.getElementById('infoDisco');

var labelsPredictCpu = [];
var labelsPredictUpload = [];
var labelsTotalMemoria = [];
var labelsInfoDisco = [];
var dadosPredictCpu = [];
var dadosPredictUpload = [];
var dadoMemoriaTotal = [];
var dadosInfoDisco = [];

var dashPredictCpu;
var dashPredictUpload;
var totalMemoria;
var infoDisco;


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
                        dadoMemoriaTotal.datasets[0].data.push(dado.MemoriaUsada, dado.MemoriaTotal);
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

labelsTotalMemoria = ["Espaço Utilizado", "Espaço Total"]
dadoMemoriaTotal = {
    labels: labelsTotalMemoria,
    datasets: [{
        label: "Memória RAM",
        data: [],
        backgroundColor: [
            "rgb(131,111,255)",
            "rgb(221, 160, 221)"
    ],
    }]
};

totalMemoria = new Chart(graficoTotalMemoria, {
    type: 'pie',
    data: dadoMemoriaTotal,
});


// Exibição da entrada e saída do disco
setInterval(exibirDisco, 5000)

function exibirDisco() {
    fetch(`/predicts/exibirDisco`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    dadosInfoDisco.datasets.forEach(dataset => {
                        dataset.data = [];
                    });

                    for (var i = 0; i < resposta.length; i++) {
                        var dado = resposta[i];
                        dadosInfoDisco.datasets[0].data.push(dado.DiscoEntrada, dado.DiscoSaida);
                    }

                    infoDisco.update()
                });
            } else {
                console.error("Nenhum dado encontrado ou erro na API");
            }
        })
        .catch(function (error) {
            console.error(
                `Erro na obtenção dos dados p / disco: ${error.message}`
            );
        });

}

labelsInfoDisco = ["Entrada", "Saída"]
dadosInfoDisco = {
    labels: labelsInfoDisco,
    datasets: [{
        label: "Disco",
        data: [],
        backgroundColor: [
            "rgb(131,111,255)",
            "rgb(221, 160, 221)"
    ],
    }]
};

infoDisco = new Chart(graficoInfoDisco, {
    type: 'pie',
    data: dadosInfoDisco,
});
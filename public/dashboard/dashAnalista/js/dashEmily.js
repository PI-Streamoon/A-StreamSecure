const dashboardPredictCpu = document.getElementById('dashboardPredictCpu');
const dashboardPredictUpload = document.getElementById('dashboardPredictUpload');
const graficoTotalMemoria = document.getElementById('totalMemoria');
var labelsPredict = [];
var labelsTotalMemoria = [];
var dadosPredictCpu = [];
var dadosPredictUpload = [];
var dadoMemoriaTotal = [];
var dashPredictCpu;
var dashPredictUpload;
var totalMemoria;

var idServidorSelecionado = 1;



// Dashboard Predict CPU

setInterval(dashPredictCpu, 1000)

function predictCPU() {
    fetch(`/predicts/predictCPU`)
        .then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    for (var i = 0; i < resposta.length; i++) {
                        var dado = resposta[i];
                        labelsPredict.push(dado.dtHora);
                        dadosPredictCpu.datasets[0].data.push(dado.dadoReal);
                        dadosPredictCpu.datasets[1].data.push(dado.dadoPredict);
                    }

                    dashPredictCpu.update()
                });
            } else { console.error("Nenhum dado encontrado ou erro no fetch"); }
        }).catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ cpu: ${error.message}`);
        }); return false;
}

labelsPredict = []
dadosPredictCpu = {
    labels: labelsPredict,
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
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Comparação entre dados reais e previstos'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Dashboard Predict Upload


dadosPredictUpload = {
    labels: labelsPredict,
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
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Comparação entre dados reais e previstos'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

setInterval(exibirMemoria, 3000)

function exibirMemoria() {
    fetch(`/predicts/exibirMemoria`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    dadoMemoriaTotal = resposta;

                    const { MemoriaTotal, MemoriaUsada } = dadoMemoriaTotal[0];

                    dadoMemoriaTotal.push(`${MemoriaTotal}`)
                    dadoMemoriaTotal.push(`${MemoriaUsada}`)

                    console.log(`${dadoMemoriaTotal}`)

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
    labels: [
        'Espaço Utilizado',
        'Espaço Disponível'
    ],
    datasets: [{
        data: [],
        backgroundColor: [
            'rgb(131,111,255)',
            'rgb(221, 160, 221)'
        ],
        hoverOffset: 4
    }]
}


totalMemoria = new Chart(graficoTotalMemoria, {
    type: 'pie',
    data: dadoMemoriaTotal
});
const dashboardPredictCpu = document.getElementById('dashboardPredictCpu');
const dashboardPredictUpload = document.getElementById('dashboardPredictUpload');
const graficoTotalDisco = document.getElementById('totalDisco');
var labelsPredict = [];
var dadosPredictCpu = [];
var dadosPredictUpload = [];
var dadoDiscoTotal = [];
var dashPredictCpu;
var dashPredictUpload;
var totalDisco;

var idServidorSelecionado = 1;

setInterval(atualizarGraficoPredict, 3000)

function atualizarGraficoPredict() {
    fetch(`/medidas/predict?idServidor=${idServidorSelecionado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (var i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    labelsPredict.push(registro.dtHora);
                    dadosPredictCpu.datasets[0].data.push(registro.cpu);
                    // dadosPredictCpu.datasets[1].data.push(predict.uploadPredict);
                }

                if (labelsPredict.length > 5) {
                    labelsPredict.shift()
                    dadosPredictCpu.datasets[0].data.shift()
                    // dadosPredictCpu.datasets[1].data.shift()
                }

                dashPredictCpu.update()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    // fetch('/dados-vetor') // Faz uma solicitação GET para a rota '/dados-vetor' no servidor
    //     .then(response => response.json()) // Analisa a resposta como JSON
    //     .then(data => {
    //         console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
    //         resposta.reverse();
    //         // Recebe os dados do vetor de números do Python
    //         const vetorNumeros = data.predictionUpload;

    //         console.log(vetorNumeros); // Vetor de números recebido do servidor

    //         console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
    //         resposta.reverse();

    //         for (var i = 0; i < resposta.length; i++) {
    //             var predict = resposta[i];
    //             var registro = resposta[i];
    //             labelsGeral.push(registro.Dia);
    //             dadosPredictCpu.datasets[1].data.push(predict.uploadPredict);
    //         }

    //         if (labelsPredict.length > 8) {
    //             labelsPredict.shift()
    //             dadosPredictCpu.datasets[1].data.shift()
    //         }

    //         dashPredict.update()

    //     })
    //     .catch(error => {
    //         console.error('Ocorreu um erro:', error);
    //     });
}

// Dashboard Predict CPU

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

labelsPredict = []
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

function exibirDisco() {
    fetch(`/predicts/buscarDisco`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    dadoDiscoTotal = resposta;
                    total.innerHTML += `<p>${arrayEspecies[0].nomeEspecie}</p>`


                });
            } else {
                console.error("Nenhum dado encontrado ou erro na API");
            }
        })
        .catch(function (error) {
            console.error(
                `Erro na obtenção dos dados p / idEspecie: ${error.message}`
            );
        });
}

labelsTotalDisco = []
dadoDiscoTotal = {
    labels: [
        'Espaço utilizado',
        'Espaço Disponível'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [],
        backgroundColor: [
            'rgb(131,111,255)',
            'rgb(221, 160, 221)'
        ],
        hoverOffset: 4
    }]
}


totalDisco = new Chart(graficoTotalDisco, {
    type: 'pie',
    data: dadoDiscoTotal
});
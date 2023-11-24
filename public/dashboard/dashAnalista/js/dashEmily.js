const dashboardPredict = document.getElementById('dashboardPredict');
var labelsPredict = [];
var dadosPredict = [];
var dashPredict;

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
                    dadosPredict.datasets[0].data.push(registro.upload);
                    // dadosPredict.datasets[1].data.push(predict.uploadPredict);
                }

                if (labelsPredict.length > 5) {
                    labelsPredict.shift()
                    dadosPredict.datasets[0].data.shift()
                    // dadosPredict.datasets[1].data.shift()
                }

                dashPredict.update()
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
    //             dadosPredict.datasets[1].data.push(predict.uploadPredict);
    //         }

    //         if (labelsPredict.length > 8) {
    //             labelsPredict.shift()
    //             dadosPredict.datasets[1].data.shift()
    //         }

    //         dashPredict.update()

    //     })
    //     .catch(error => {
    //         console.error('Ocorreu um erro:', error);
    //     });
}

// Dashboard Predict

labelsPredict = []
dadosPredict = {
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

dashPredict = new Chart(dashboardPredict, {
    type: "line",
    data: dadosPredict,
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
const sidebarNomeUser = document.querySelector('#sidebar .sidebar-name');
const navNomeUser = document.querySelector('#profileDropdown .nav-profile-name');
const nomeServidor = document.querySelector('#infosServidor #nomeServidor');
const localidadeServidor = document.querySelector('#infosServidor #localidadeServidor');
const listagemServidores = document.querySelector('.table #listagemServidores');
const scoreServidor = document.getElementById('scoreServidor');
const configLineCharts = {
    scales: {
        responsive: true,
        y: {
            min: 0,
            max: 100
        },
        yAxes: [{
            display: true,
            gridLines: {
                drawBorder: false,
                display: true,
            },
            ticks: {
                display: true,
                beginAtZero: true,
            }
        }],
        xAxes: [{
            display: true,
            position: 'bottom',
            gridLines: {
                drawBorder: false,
                display: false,
            },
            ticks: {
                display: true,
                beginAtZero: true,
                stepSize: 10
            }
        }],

    },
    legend: {
        display: false,
        labels: {
            boxWidth: 0,
        }
    },
    elements: {
        point: {
            radius: 5,
            backgroundColor: 'white',
            borderColor: '#6248AE',
            borderWidth: 2,

        },
        line: {
            tension: .4,
        },
    },
    tooltips: {
        backgroundColor: '#6248AE',
    },
};

const changeComponente = (idElementChart, title, chartDataset)=>{
    // Display none para todos os charts de monitoramento
    let chartsMonitoramento = document.querySelectorAll('[data-id="chartMonitoramento"]');

    chartsMonitoramento.forEach((chart) => {
        chart.className = 'd-none';
    });

    // Alterar o titulo de todos os lugares para o componente desejado
    let titlesCharts = document.querySelectorAll('[data-id="titleComponente"]');

    titlesCharts.forEach((titleChart) => {
        titleChart.innerText = title;
    });

    // Mostra o chart selecionado
    let elementChart = document.getElementById(idElementChart);
    elementChart.className = 'd-block';

    // Altera a legenda do gráfico
    legendaChartMonitoramento.innerHTML = '';

    chartDataset = chartDataset.datasets

    chartDataset.forEach((dataset, index) => {
        let label = dataset.label;
        
        if (label != ''){
            
            legendaChartMonitoramento.innerHTML += `
            <div class="mr-md-5 mb-4">
                <h4 class="mb-1"><i class="typcn typcn-chart-line mr-1"></i>${dataset.label} ${dataset.unMedida}</h4>
                <h2 class="mb-1 font-weight-bold" data-id='legenda-dataset-${index}-${label}' style="color:${dataset.borderColor[0]}"></h2>
            </div>
            `;
        }
    });


    datasetsSelecionado = chartDataset;
}

const loadCpuChart = () => {
    cpuChartDataset = {
        labels: [],
        datasets: [{
            label: 'CPU',
            unMedida: '%',
            data: [],
            borderColor: [
                '#6248AE',
            ],borderWidth: 3,
            fill: true,
        },
        {
            label: '',
            data: [],
            borderWidth: 0,
            fill: false,
            borderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointRadius: 0,
        }
        ],
    };

    var lineChartCanvas = document.getElementById('cpuChart').getContext("2d");
    cpuChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: cpuChartDataset,
        options: configLineCharts
    });
}

const loadMemoriaChart = () => {
    memoriaChartDataset = {
        labels: [],
        datasets: [{
            label: 'Memória',
            unMedida: '%',
            data: [],
            borderColor: [
                '#6248AE',
            ],borderWidth: 3,
            fill: true,
        },
        {
            label: '',
            data: [],
            borderWidth: 0,
            fill: false,
            borderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointRadius: 0,
        }
        ],
    };

    var lineChartCanvas = document.getElementById('memoriaChart').getContext("2d");
    memoriaChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: memoriaChartDataset,
        options: configLineCharts
    });
}

const loadDiscoChart = () => {
    discoChartDataset = {
        labels: [],
        datasets: [{
            label: 'Uso do Disco',
            unMedida: '%',
            data: [],
            borderColor: [
                '#6248AE',
            ],borderWidth: 3,
            fill: true,
        },
        {
            label: '',
            data: [],
            borderWidth: 0,
            fill: false,
            borderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointRadius: 0,
        }
        ],
    };

    var lineChartCanvas = document.getElementById('discoChart').getContext("2d");
    discoChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: discoChartDataset,
        options: configLineCharts
    });
}

const loadTaxaUploadChart = () => {
    taxaUploadChartDataset = {
        labels: [],
        datasets: [{
            label: 'Taxa Upload',
            unMedida: 'MB/s',
            data: [],
            borderColor: [
                '#6248AE',
            ],borderWidth: 3,
            fill: true,
        },
        {
            label: '',
            data: [],
            borderWidth: 0,
            fill: false,
            borderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointRadius: 0,
        }
        ],
    };

    var lineChartCanvas = document.getElementById('taxaUploadChart').getContext("2d");
    taxaUploadChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: taxaUploadChartDataset,
        options: configLineCharts
    });
}

const loadTaxaDownloadChart = () => {
    taxaDownloadChartDataset = {
        labels: [],
        datasets: [{
            label: 'Taxa Downloads',
            unMedida: 'MB/s',
            data: [],
            borderColor: [
                '#6248AE',
            ],borderWidth: 3,
            fill: true,
        },
        {
            label: '',
            data: [],
            borderWidth: 0,
            fill: false,
            borderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointRadius: 0,
        }
        ],
    };

    var lineChartCanvas = document.getElementById('taxaDownloadChart').getContext("2d");
    taxaDownloadChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: taxaDownloadChartDataset,
        options: configLineCharts
    });
}

const loadIODiscoChart = () => {
    ioDiscoChartDataset = {
        labels: [],
        datasets: [{
            label: 'Entrada Disco',
            unMedida: 'MB/s',
            data: [],
            borderColor: [
                '#6248AE',
            ],borderWidth: 3,
            fill: true,
        },
        {
            label: 'Saida Disco',
            unMedida: 'MB/s',
            data: [],
            borderColor: [
                '#3498db',
            ],borderWidth: 3,
            fill: true,
            pointBorderColor: '#3498db'
        },
        {
            label: '',
            data: [],
            borderWidth: 0,
            fill: false,
            borderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointRadius: 0,
        }
        ],
    };

    var lineChartCanvas = document.getElementById('ioDiscoChart').getContext("2d");
    ioDiscoChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: ioDiscoChartDataset,
        options: configLineCharts
    });
}

const loadScoreServidor = () => {
    scoreServidorChart = new ProgressBar.Circle(scoreServidor, {
        color: '#001737',
        strokeWidth: 10,
        trailWidth: 10,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: {
            color: '#aaa',
            width: 10
        },
        to: {
            color: '#00de6b',
            width: 10
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);


            var percentage = Math.round(circle.value() * 100);
            var value = '<p class="text-center mb-0">Score</p>' + percentage + "%";

            if (percentage >= 0 && percentage < 60) {
                circle.path.setAttribute('stroke', 'red');
            } else if (percentage >= 60 && percentage < 99) {
                // If between 50% (inclusive) and 99%, set color to yellow
                circle.path.setAttribute('stroke', 'orange');
            } else {
                circle.path.setAttribute('stroke', 'black');
            }

            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }

        }
    });

    scoreServidorChart.text.style.fontSize = '1.875rem';
    scoreServidorChart.text.style.fontWeight = '700';
}

const carregarNome = () => {
    sidebarNomeUser.innerText = localStorage.NOME_USUARIO;
    navNomeUser.innerText = localStorage.NOME_USUARIO;
}

const carregarInfosServidorSelecionado = (localidade) => {
    nomeServidor.innerText = "Servidor: " + idServidorSelecionado;
    localidadeServidor.innerText = localidade;
}

const trocarServidor = (idServidor, localidade)=>{
    idServidorSelecionado = idServidor;
    carregarInfosServidorSelecionado(localidade);
}

const carregarServidoresTable = (listarServidores) => {
    for (let i = 0; i < listarServidores.length; i++) {
        let idServidor = listarServidores[i].idServidor;

        listagemServidores.innerHTML += `
            <tr onclick="trocarServidor(${idServidor}, '${listarServidores[i].localidade}')">
                <th scope="row">${i + 1}</th>
                <td id="nomeServidor-${idServidor}"> Servidor ${idServidor}</td>
                <td>${listarServidores[i].localidade}</td>
                <td id="estadoServidor-${idServidor}">
                    <span class="badge badge-success">Normal</span>
                </td>
            </tr>`
    }
}

const carregarServidorInic = () => {
    fetch(`/servidor/listarServidores`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    idServidorSelecionado = resposta[0].idServidor;

                    console.log(resposta[0].localidade)

                    carregarInfosServidorSelecionado(resposta[0].localidade);
                    carregarServidoresTable(resposta);
                })
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

window.onload = () => {
    carregarNome();
    carregarServidorInic();
    loadScoreServidor();
    loadCpuChart();
    loadMemoriaChart();
    loadDiscoChart();
    loadIODiscoChart();
    loadTaxaUploadChart();
    loadTaxaDownloadChart();
    changeComponente('cpuChart', 'CPU %', cpuChartDataset);
}
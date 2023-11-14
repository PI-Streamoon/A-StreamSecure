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


const loadCpuChart = () => {
    cpuChartDataset = {
        labels: [],
        datasets: [{
            label: 'CPU',
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
            label: 'CPU',
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
            label: 'CPU',
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
            label: 'CPU',
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
            label: 'CPU',
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
            label: 'CPU',
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

            if (percentage < 60) {
                // If less than 50%, set color to red
                circle.path.setAttribute('stroke', 'red');
            } else if (percentage >= 60 && percentage < 99) {
                // If between 50% (inclusive) and 99%, set color to yellow
                circle.path.setAttribute('stroke', 'orange');
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

const carregarInfosServidorSelecionado = (idServidor, localidade) => {
    nomeServidor.innerText = "Servidor: " + idServidor;
    localidadeServidor.innerText = localidade;
}

const carregarServidoresTable = (listarServidores) => {
    for (let i = 0; i < listarServidores.length; i++) {
        let idServidor = listarServidores[i].idServidor;

        listagemServidores.innerHTML += `
            <tr onclick="trocarServidor(${idServidor})">
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

                    carregarInfosServidorSelecionado(idServidorSelecionado, resposta[0].localidade);
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
}
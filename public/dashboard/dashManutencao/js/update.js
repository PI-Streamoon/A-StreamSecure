const tempoUltimoMonitoramento = document.querySelector('#infosServidor #tempoUltimoMonitoramento');
const legendaChartMonitoramento = document.getElementById('legendaChartMonitoramento');
const ultimas10Leituras = document.getElementById('ultimas10Leituras');
const interval = 2000;

// Update Ultimas Medidas
setInterval(() => {
    ultimasMedidas();
    checarFalhas();
}, interval);


const mudarValoresBanners = (values)=>{
    for (let key in values){
        let label = document.getElementById(`info-${key}`);

        if (label != undefined){
            label.innerText = values[key]
        }
    }
}

const mudarBackgroundBanners = (values)=>{
    let nivelAlerta = 'success';

    for(let key in values){
        let valor = values[key]

        if(valor == 1){
            nivelAlerta = 'warning';
        }else if(valor == 2){
            nivelAlerta = 'danger';
        }

        let banner = document.getElementById(`Banner-${key}`);

        if (banner != undefined && values.idServidor == idServidorSelecionado){
            banner.className = `bg-${nivelAlerta} rounded d-flex align-items-center justify-content-between p-4 text-white font-weight-bolder pointer mt-2`;
        }
    }

    return nivelAlerta;
}

const atualizar10UltimasLeituras = ()=>{
    let idChart = Object.keys(datasetsSelecionado[0]._meta)[0];
    let labels = datasetsSelecionado[0]._meta[idChart].controller.chart.data.labels

    let html = '';

    for (let index = labels.length - 1; index >= 0; index--) {
        const label = labels[index];
        
        html += `
        <div class="d-flex justify-content-between mb-4">
            <div class="text-secondary font-weight-medium">${label}</div>
            <div class="font-weight-medium">
        `;

        for (let i = 0; i < datasetsSelecionado.length - 1; i++) {
            const dataset = datasetsSelecionado[i];
            html += `${dataset.data[index]} ${dataset.unMedida}<br>`;
        }
        
        html += `</div>
        </div>
        `
    }

    ultimas10Leituras.innerHTML = html;
}

const atualizarLegendasChart = (value, index, label)=>{
    let labelDataset = document.querySelector(`[data-id="legenda-dataset-${index}-${label}"]`);

    if(labelDataset != undefined){
        labelDataset.innerText = value;
    }
}

const atualizarChart = (chart, chartDataset, time, datasets) => {
    chartDataset.labels.push(time);
    
    datasets.forEach((value, index)=>{
        chartDataset.datasets[index].data.push(value);

        atualizarLegendasChart(value, index, chartDataset.datasets[index].label);

        atualizar10UltimasLeituras();

        if (chartDataset.labels.length >= 10) {
            chartDataset.datasets[index].data.shift();    
        } 

    })

    chartDataset.datasets[chartDataset.datasets.length-1].data.push(100);

    if (chartDataset.labels.length >= 10) {
        chartDataset.labels.shift()
        chartDataset.datasets[chartDataset.datasets.length-1].data.shift();

    } 

    chart.update();
}

const atualizarTempo = (momentoRegistro)=>{
    var dataAtual = new Date();
    var dataEspecifica = new Date(momentoRegistro);

    let diferencaEmMilissegundos = dataAtual - dataEspecifica;
    let diferencaEmSegundos = diferencaEmMilissegundos / 1000;
    tempoUltimoMonitoramento.innerText = `${diferencaEmSegundos.toFixed(0)} Segundos atrás`

    if (diferencaEmSegundos > 60){
        let diferencaEmMinutos = diferencaEmSegundos / 60;
        tempoUltimoMonitoramento.innerText = `${diferencaEmMinutos.toFixed(0)} Minutos atrás`

        if(diferencaEmMinutos > 60){
            let diferencaEmHoras = diferencaEmMinutos / 60;
            tempoUltimoMonitoramento.innerText = `${diferencaEmHoras.toFixed(0)} Horas atrás`

            if(diferencaEmHoras > 24){
                let diferencaEmDias = diferencaEmHoras / 24;

                tempoUltimoMonitoramento.innerText = `${diferencaEmDias.toFixed(0)} Dias atrás`
            }
        }
    }
}

const atualizarStatusServidor = (idServidor, nivelAlerta)=>{
    let estadoServidor = document.querySelector(`#estadoServidor-${idServidor} span`)

    estadoServidor.className = `badge badge-${nivelAlerta}`;
    if (nivelAlerta == 'success') estadoServidor.innerText = 'Normal';
    if (nivelAlerta == 'warning') estadoServidor.innerText = 'Alerta';
    if (nivelAlerta == 'danger') estadoServidor.innerText = 'Critico';
}

const atualizarScoreServidorChart = ()=>{

    let countSucess = document.querySelectorAll('#rowBanner .bg-success').length;
    let countDanger = document.querySelectorAll('#rowBanner .bg-danger').length * 1.25;


    scoreServidorChart.animate((countSucess-countDanger)/6); // Number from 0.0 to 1.0
}

const ultimasMedidas = ()=>{
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}&limit=${10-cpuChartDataset.labels.length}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                resposta.reverse()
                
                resposta.forEach((linha)=>{
                    mudarValoresBanners(linha)

                    atualizarChart(cpuChart, cpuChartDataset, linha.dtHora, [linha.CPU]);
                    atualizarChart(memoriaChart, memoriaChartDataset, linha.dtHora, [linha.Memoria]);
                    atualizarChart(discoChart, discoChartDataset, linha.dtHora, [linha.Disco]);
                    atualizarChart(taxaUploadChart, taxaUploadChartDataset, linha.dtHora, [linha.Upload]);
                    atualizarChart(taxaDownloadChart, taxaDownloadChartDataset, linha.dtHora, [linha.Download]);
                    atualizarChart(ioDiscoChart, ioDiscoChartDataset, linha.dtHora, [linha.DiscoEntrada, linha.DiscoSaida]);
                })
    
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

const checarFalhas = ()=>{
    fetch(`/alertas/realTime`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                resposta.forEach((linha)=>{
                    atualizarTempo(linha.MomentoRegistro)
                    let nivelAlerta = mudarBackgroundBanners(linha);
                    atualizarStatusServidor(linha.idServidor, nivelAlerta);
                })

                atualizarScoreServidorChart();
    
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}
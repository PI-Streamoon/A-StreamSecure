const tempoUltimoMonitoramento = document.querySelector('#infosServidor #tempoUltimoMonitoramento');

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

const atualizarChart = (chart, chartDataset, time, value) => {
    chartDataset.labels.push(time);
    chartDataset.datasets[0].data.push(value);
    chartDataset.datasets[1].data.push(100);

    if (chartDataset.datasets[0].data.length >= 10) {
        chartDataset.labels.shift()
        chartDataset.datasets[0].data.shift()
        chartDataset.datasets[1].data.shift();

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
    if (nivelAlerta == 'warning') estadoServidor.innerText = 'Alerta';
    if (nivelAlerta == 'danger') estadoServidor.innerText = 'Critico';
}

const atualizarScoreServidorChart = ()=>{

    let countSucess = document.querySelectorAll('#rowBanner .bg-success').length;

    scoreServidorChart.animate(countSucess/6); // Number from 0.0 to 1.0
}

const ultimasMedidas = ()=>{
    fetch(`/medidas/ultimas?idServidor=${idServidorSelecionado}&limit=${10-cpuChartDataset.labels.length}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse()
                
                resposta.forEach((linha)=>{
                    mudarValoresBanners(linha)

                    atualizarChart(cpuChart, cpuChartDataset, linha.dtHora, linha.CPU);
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
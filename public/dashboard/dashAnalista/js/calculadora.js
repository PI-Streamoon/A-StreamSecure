var simples = 'simples';
var comparada = 'comparada';
var comparada1 = 'comparada1';
var comparada2 = 'comparada2';

var vt_ec2simples = [];
var vt_ec2comparada1 = [];
var vt_ec2comparada2 = [];

var tabelaSimples = document.getElementById('tabelaInstanciasSimples');
var tabelaComparada1 = document.getElementById('tabelaInstanciasComparada1');
var tabelaComparada2 = document.getElementById('tabelaInstanciasComparada2');

var selectC2 = document.getElementById('selectsComparacao2');
var botaoC2 = document.getElementById('botaoCarregarC2');

var mostrarRelatorio = document.getElementById('relatorio')
var mostrarCompPreco = document.getElementById('compararPreco')
var mostrarPrecoTempo = document.getElementById('diferencaTempo')


carregarRegioes()
carregarSO()


function mostrarSimulacao(situacao) {

    var sistema = so.value;
    var local = regiao.value;

    var sistemaC2 = soComparada2.value;
    var localC2 = regiaoComparada2.value;

    
    if (local != 'default') {
        if (situacao == 'simples') {
            
            carregarEC2(sistema, local, situacao, vt_ec2simples);

            textoTabela.innerHTML = "instâncias " + sistema;

            tabelaSimples.classList.remove('invisible');

            if (!tabelaComparada1.classList.contains('invisible')) {

                tabelaComparada1.classList.add('invisible');
                tabelaComparada2.classList.add('invisible');
                selectC2.classList.add('invisible');
                botaoC2.classList.add('invisible');
            }

        } else if (situacao == 'comparada1') {

            carregarEC2(sistema, local, situacao, vt_ec2comparada1);

            textoTabelaComparada1.innerHTML = "instâncias Iníciais " + sistema;

            tabelaComparada1.classList.remove('invisible');
            selectC2.classList.remove('invisible');
            botaoC2.classList.remove('invisible');

            if (!tabelaSimples.classList.contains('invisible')) {

                tabelaSimples.classList.add('invisible');
            }

        } else {

            carregarEC2(sistemaC2, localC2, situacao, vt_ec2comparada2)

            textoTabelaComparada2.innerHTML = "instâncias Finais " + sistemaC2;

            tabelaComparada2.classList.remove('invisible');
        }

        if (!mostrarRelatorio.classList.contains('invisible')) {

            mostrarRelatorio.classList.add('invisible');
        }
    }

}


function carregarRegioes() {

    fetch(`/calculadora/mostrarRegioes`).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {

                for (let i = 0; i < resposta.length; i++) {
                    regiao.innerHTML += `<option value="${resposta[i].idLocais}" >${resposta[i].descricao}</option>`;
                    regiaoComparada2.innerHTML += `<option value="${resposta[i].idLocais}" >${resposta[i].descricao}</option>`;
                }
            })
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}


function carregarSO() {

    fetch(`/calculadora/mostrarSO`).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {

                for (let i = 0; i < resposta.length; i++) {
                    so.innerHTML += `<option value="${resposta[i].so}" >${resposta[i].so}</option>`;
                    soComparada2.innerHTML += `<option value="${resposta[i].so}" >${resposta[i].so}</option>`;
                }
            })
        } else {
            throw ('Houve um erro na API')
        }
    }).catch(function (resposta) {
        console.log(resposta)
    })
}


function carregarEC2(so, fkLocal, situacao, vt) {

    vt.length = 0;

    var div;

    switch (situacao) {
        case 'simples':
            div = dadosEC2Simples;
            break;
    
        case 'comparada1':
            div = dadosEC2Comparada1;
            break;

        case 'comparada2':
            div = dadosEC2Comparada2;
            break;
    }

    fetch(`/calculadora/mostrarInstancias/${so}/${fkLocal}`).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {

                for (let i = 0; i < resposta.length; i++) {

                    vt.push(resposta[i])

                    gerarLinhasTabela(vt, div, i)
                }
            })

        } else {
            throw ('Houve um erro na API!');
        }

    }).catch(function (resposta) {
        console.log(resposta);
    })

}


function gerarLinhasTabela(vt, div, i) {

    var name = "";

    switch (vt) {
        case vt_ec2simples:
            name = "ec2s";
            break;
        case vt_ec2comparada1:
            name = "ec2c1";
            break;
        case vt_ec2comparada2:
            name = "ec2c2";
            break;
    }

    div.innerHTML += `
                <tr>
                        <td>    
                        <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="${name}" id="${i}" value="${vt[i].preco}"> 
                                <i class="input-helper"></i></label>
                        </div>
                        </td>
                        <td class="py-1">
                            ${vt[i].tipo}
                        </td>
                        <td>
                            ${vt[i].vcpu}
                        </td>
                        <td>
                            ${vt[i].ram}
                        </td>
                        <td>
                            $ ${vt[i].preco.toFixed(2)}
                        </td>
                    </tr>`;


}    


function pesquisarNome(situacao) {

    var busca;
    var vetor;
    var div;

    switch (situacao) {
        case 'simples':
            busca = iptBuscaSimples.value;
            vetor = vt_ec2simples;
            div = dadosEC2Simples;

            break;
    
        case 'comparada1':
            busca = iptBuscaComparacao1.value;
            vetor = vt_ec2comparada1;
            div = dadosEC2Comparada1;

            break;

        case 'comparada2':
            busca = iptBuscaComparacao2.value;
            vetor = vt_ec2comparada2;
            div = dadosEC2Comparada2;

            break;
    }

        if (busca != "") {

            div.innerHTML = "";

            for (let i = 0; i < vetor.length; i++) {

                if (vetor[i].tipo.indexOf(busca.toLowerCase()) > -1) {

                    gerarLinhasTabela(vetor, div, i)
                }
            }

        } else {

            div.innerHTML = "";

            for (let i = 0; i < vetor.length; i++) {

                gerarLinhasTabela(vetor, div, i)
            }
        }

}


function simular(situacao) {

    if (situacao == 'simples') {

        mostrarRelatorio.classList.remove('invisible');

        mostrarCompPreco.classList.add('invisible');
        mostrarPrecoTempo.classList.add('invisible');


    } else {

        mostrarRelatorio.classList.remove('invisible');
        mostrarCompPreco.classList.remove('invisible');
        mostrarPrecoTempo.classList.remove('invisible');

    }

    calculo(situacao)
}

function calculo(situacao) {

    if (situacao == 'simples') {

        const tabela = document.getElementById('dadosEC2Simples');
        const opcaoSelecionada = tabela.querySelector('input[name="ec2s"]:checked')
        var nomeInstancia = vt_ec2simples[opcaoSelecionada.id].tipo

        if (opcaoSelecionada) {
            
            
            tituloDiferencaTempo.innerHTML = `Diferença pelo tempo (${nomeInstancia})`;

            gastoHora.innerHTML = `$ ${Number(opcaoSelecionada.value).toFixed(2)}`;
            gastoDia.innerHTML = `$ ${Number(opcaoSelecionada.value * 24).toFixed(2)}`;
            gastoSemana.innerHTML = `$ ${Number(opcaoSelecionada.value * 24 * 7).toFixed(2)}`;
            gastoMes.innerHTML = `$ ${Number(opcaoSelecionada.value * 24 * 30).toFixed(2)}`;
            gastoAno.innerHTML = `$ ${Number(opcaoSelecionada.value * 24 * 365).toFixed(2)}`;


        } else {
            alert("Selecione uma instância para realizar a simulação")
        }

    } else {

        const tabela1 = document.getElementById('dadosEC2Comparada1');
        const tabela2 = document.getElementById('dadosEC2Comparada2');
        const opcaoSelecionadac1 = tabela1.querySelector('input[name="ec2c1"]:checked')
        const opcaoSelecionadac2 = tabela2.querySelector('input[name="ec2c2"]:checked')
        const nomeInstInicial = vt_ec2comparada1[opcaoSelecionadac1.id].tipo
        const nomeInstFinal = vt_ec2comparada2[opcaoSelecionadac2.id].tipo

        if (opcaoSelecionadac1 && opcaoSelecionadac2) {

            tituloDiferencaTempo.innerHTML = "Diferença pelo tempo Prevista";

            gastoHora.innerHTML = `$ ${Number(opcaoSelecionadac2.value).toFixed(2).replace(".", ",")}`;
            gastoDia.innerHTML = `$ ${Number(opcaoSelecionadac2.value * 24).toFixed(2).replace(".", ",")}`;
            gastoSemana.innerHTML = `$ ${Number(opcaoSelecionadac2.value * 24 * 7).toFixed(2).replace(".", ",")}`;
            gastoMes.innerHTML = `$ ${Number(opcaoSelecionadac2.value * 24 * 30).toFixed(2).replace(".", ",")}`;
            gastoAno.innerHTML = `$ ${Number(opcaoSelecionadac2.value * 24 * 365).toFixed(2).replace(".", ",")}`;
            

            precoInstAtual.innerHTML = `${Number(opcaoSelecionadac1.value).toFixed(2).replace(".", ",")}`;
            precoInstFutura.innerHTML = `${Number(opcaoSelecionadac2.value).toFixed(2).replace(".", ",")}`;

            var percentDiferenca = (((opcaoSelecionadac1.value - opcaoSelecionadac2.value)*100)/opcaoSelecionadac1.value)*-1;

            if (percentDiferenca > 0) {

                categorizacaoAcao.innerHTML = "aumento de"
                diferenca.className  = "text-primary mb-1 font-weight-bold"

            } else if (percentDiferenca < 0) {

                categorizacaoAcao.innerHTML = "Redução de"
                diferenca.className  = "text-secondary mb-1 font-weight-bold"

            } else {

                categorizacaoAcao.innerHTML = "Inalterado"
                diferenca.className  = "text-warning mb-1 font-weight-bold"

            }

            instAtual.innerHTML = nomeInstInicial;
            InstFinal.innerHTML = nomeInstFinal;

            diferenca.innerHTML = `${Number(percentDiferenca).toFixed(2).replace(".", ",")}%`;

            var dadosPreco = [opcaoSelecionadac1.value * 24 * 365, opcaoSelecionadac2.value * 24 * 365];

            tituloDiferencaTempo.innerHTML = "Diferença anual entre instâncias"

            valorInstInicial.innerHTML = nomeInstInicial;
            valorInstFinal.innerHTML = nomeInstFinal;

            valorAnoAtual.innerHTML = "$ "+ Number(opcaoSelecionadac1.value * 24 * 365).toFixed(2).replace(".", ",");
            valorAnoFinal.innerHTML = "$ "+ Number(opcaoSelecionadac2.value * 24 * 365).toFixed(2).replace(".", ",");
            diferencaComp.innerHTML = `${Number(percentDiferenca).toFixed(2).replace(".",",")}% em relação a Instância inicial`;

            var nomesInstancias = [nomeInstInicial, nomeInstFinal];

            grafico(dadosPreco, nomesInstancias);

        } else {
            alert("Selecione as instâncias para realizar a simulação");
        }

    }
}


    var barChartCanvas = document.getElementById('barChart').getContext('2d');
   

    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: {
          labels: [],
          datasets: [{
            label: [],
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
            fill: false
          }]
      },
      options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
      
        }
      });


    function grafico(dados, labels) {  

        barChart.data.datasets[0].data = dados;
        barChart.data.labels = labels;

        barChart.update();
    }
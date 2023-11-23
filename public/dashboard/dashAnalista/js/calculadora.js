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

carregarPagina()

function carregarPagina() {
    var nome = localStorage.NOME_USUARIO;

    nomeHeader.innerHTML = nome;
    nomeSidebar.innerHTML = nome;

    carregarRegioes()
    carregarSO()
}


function logout() {
    delete localStorage.CPF_USUARIO;
    delete localStorage.EMAIL_USUARIO;
    delete localStorage.NOME_USUARIO;
    delete localStorage.ID_USUARIO;
    delete localStorage.FK_ADMIN;
    delete localStorage.FK_EMPRESA;

    window.location = "../../index.html";
}


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

    if (situacao == 'simples') {

        fetch(`/calculadora/mostrarInstancias/${so}/${fkLocal}`).then(function (resposta) {

            if (resposta.ok) {

                resposta.json().then(function (resposta) {

                    for (let i = 0; i < resposta.length; i++) {

                        vt.push(resposta[i])

                        gerarLinhasTabela(vt, dadosEC2Simples, i)
                    }
                })

            } else {
                throw ('Houve um erro na API!');
            }

        }).catch(function (resposta) {
            console.log(resposta);
        })

    } else if (situacao == 'comparada1') {


        fetch(`/calculadora/mostrarInstancias/${so}/${fkLocal}`).then(function (resposta) {

            if (resposta.ok) {

                resposta.json().then(function (resposta) {

                    for (let i = 0; i < resposta.length; i++) {

                        vt.push(resposta[i])

                        gerarLinhasTabela(vt, dadosEC2Comparada1, i)
                    }
                })

            } else {
                throw ('Houve um erro na API!');
            }

        }).catch(function (resposta) {
            console.log(resposta);
        })

    } else if (situacao == 'comparada2') {

        fetch(`/calculadora/mostrarInstancias/${so}/${fkLocal}`).then(function (resposta) {

            if (resposta.ok) {

                resposta.json().then(function (resposta) {

                    for (let i = 0; i < resposta.length; i++) {

                        vt.push(resposta[i])

                        gerarLinhasTabela(vt, dadosEC2Comparada2, i)
                    }
                })

            } else {
                throw ('Houve um erro na API!');
            }

        }).catch(function (resposta) {
            console.log(resposta);
        })
    }

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
                                    <input type="radio" class="form-check-input" name="${name}" value="${vt[i].preco}"> 
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

    var buscaSimples = iptBuscaSimples.value;
    var buscaComparacao1 = iptBuscaComparacao1.value;
    var buscaComparacao2 = iptBuscaComparacao2.value;

    if (situacao == 'simples') {

        if (buscaSimples != "") {


            dadosEC2Simples.innerHTML = "";

            for (let i = 0; i < vt_ec2simples.length; i++) {

                if (vt_ec2simples[i].tipo.indexOf(buscaSimples.toLowerCase()) > -1) {

                    gerarLinhasTabela(vt_ec2simples, dadosEC2Simples, i)
                }
            }

        } else {

            dadosEC2Simples.innerHTML = "";

            for (let i = 0; i < vt_ec2simples.length; i++) {

                gerarLinhasTabela(vt_ec2simples, dadosEC2Simples, i)
            }
        }

    } else if (situacao == 'comparada1') {

        if (buscaComparacao1 != "") {

            dadosEC2Comparada1.innerHTML = "";

            for (let i = 0; i < vt_ec2comparada1.length; i++) {

                if (vt_ec2comparada1[i].tipo.indexOf(buscaComparacao1.toLowerCase()) > -1) {

                    gerarLinhasTabela(vt_ec2comparada1, dadosEC2Comparada1, i)
                }
            }

        } else {

            dadosEC2Comparada1.innerHTML = "";

            for (let i = 0; i < vt_ec2comparada1.length; i++) {

                gerarLinhasTabela(vt_ec2comparada1, dadosEC2Comparada1, i)
            }
        }

    } else if (situacao == 'comparada2') {

        if (buscaComparacao2 != "") {

            dadosEC2Comparada2.innerHTML = "";

            for (let i = 0; i < vt_ec2comparada2.length; i++) {

                if (vt_ec2comparada2[i].tipo.indexOf(buscaComparacao2.toLowerCase()) > -1) {

                    gerarLinhasTabela(vt_ec2comparada2, dadosEC2Comparada2, i)
                }
            }

        } else {

            dadosEC2Comparada2.innerHTML = "";

            for (let i = 0; i < vt_ec2comparada2.length; i++) {

                gerarLinhasTabela(vt_ec2comparada2, dadosEC2Comparada2, i)
            }
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

        if (opcaoSelecionada) {

            tituloDiferencaTempo.innerHTML = "Diferença pelo tempo";

            gastoHora.innerHTML = `$: ${Number(opcaoSelecionada.value).toFixed(2)}`;
            gastoDia.innerHTML = `$: ${Number(opcaoSelecionada.value * 24).toFixed(2)}`;
            gastoSemana.innerHTML = `$: ${Number(opcaoSelecionada.value * 24 * 7).toFixed(2)}`;
            gastoMes.innerHTML = `$: ${Number(opcaoSelecionada.value * 24 * 30).toFixed(2)}`;
            gastoAno.innerHTML = `$: ${Number(opcaoSelecionada.value * 24 * 365).toFixed(2)}`;

        } else {
            alert("Selecione uma instância para realizar a simulação")
        }

    } else {

        const tabela1 = document.getElementById('dadosEC2Comparada1');
        const tabela2 = document.getElementById('dadosEC2Comparada2');
        const opcaoSelecionadac1 = tabela1.querySelector('input[name="ec2c1"]:checked')
        const opcaoSelecionadac2 = tabela2.querySelector('input[name="ec2c2"]:checked')

        if (opcaoSelecionadac1 && opcaoSelecionadac2) {

            tituloDiferencaTempo.innerHTML = "Diferença pelo tempo Prevista";

            gastoHora.innerHTML = `$: ${Number(opcaoSelecionadac2.value).toFixed(2).replace(".", ",")}`;
            gastoDia.innerHTML = `$: ${Number(opcaoSelecionadac2.value * 24).toFixed(2).replace(".", ",")}`;
            gastoSemana.innerHTML = `$: ${Number(opcaoSelecionadac2.value * 24 * 7).toFixed(2).replace(".", ",")}`;
            gastoMes.innerHTML = `$: ${Number(opcaoSelecionadac2.value * 24 * 30).toFixed(2).replace(".", ",")}`;
            gastoAno.innerHTML = `$: ${Number(opcaoSelecionadac2.value * 24 * 365).toFixed(2).replace(".", ",")}`;
            

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

            diferenca.innerHTML = `${Number(percentDiferenca).toFixed(2).replace(".", ",")}%`;


            tituloDiferencaTempo.innerHTML = "Diferença anual entre instâncias"
            valorAnoAtual.innerHTML = "$ "+ Number(opcaoSelecionadac1.value * 24 * 365).toFixed(2).replace(".", ",")
            valorAnoFinal.innerHTML = "$ "+ Number(opcaoSelecionadac2.value * 24 * 365).toFixed(2).replace(".", ",")
            diferencaComp.innerHTML = `${Number(percentDiferenca).toFixed(2).replace(".",",")}% em relação a Instância inicial`;
        }

    }

}
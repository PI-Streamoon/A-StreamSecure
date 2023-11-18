var vt_ec2 = [];

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


function mostrarTabela() {

    var sistema = so.value;
    var local = regiao.value;

    if (local != 'default') {

        var tabela = document.getElementById('tabelaInstancias');
        carregarEC2(sistema, local);

        textoTabela.innerHTML = "instâncias "+ sistema;
        tabela.classList.remove('invisible');
    }

}


function carregarRegioes() {

    fetch(`/calculadora/mostrarRegioes`).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {

                for (let i = 0; i < resposta.length; i++) {
                    regiao.innerHTML += `<option value="${resposta[i].idLocais}" >${resposta[i].descricao}</option>`;
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
                    so.innerHTML += `<option value="${resposta[i].so}" >${resposta[i].so}</option>`
                }
            })
        } else {
            throw ('Houve um erro na API')
        }
    }).catch(function (resposta) {
        console.log(resposta)
    })
}

function carregarEC2(so, fkLocal) {

    dadosEC2.innerHTML = "";
    vt_ec2.length = 0;

    fetch(`/calculadora/mostrarInstancias/${so}/${fkLocal}`).then(function (resposta){

        if (resposta.ok) {
            
            resposta.json().then(function (resposta) {


                for (let i = 0; i < resposta.length; i++) {
            
                    vt_ec2.push(resposta[i])
            
                    dadosEC2.innerHTML += `
                    <tr>
                            <td>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="ec2" id="${resposta[i].idEc2}" value="${i}"> 
                                    </label>
                                </div>
                            </td>
                            <td class="py-1">
                                ${resposta[i].tipo}
                            </td>
                            <td>
                                ${resposta[i].vcpu}
                            </td>
                            <td>
                                ${resposta[i].ram}
                            </td>
                            <td>
                                    $ ${resposta[i].preco}
                            </td>
                        </tr>`;
                }
            })
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.log(resposta);
    })
}

function pesquisar() {
    
    var busca = iptBusca.value;

    if (busca != "") {

        dadosEC2.innerHTML = "";

        for (let i = 0; i < vt_ec2.length; i++) {

            if (vt_ec2[i].tipo.indexOf(busca.toLowerCase()) > -1) {

                dadosEC2.innerHTML += `
                    <tr>
                            <td>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="ec2" id="${vt_ec2[i].idEc2}" value="${i}"> 
                                    </label>
                                </div>
                            </td>
                            <td class="py-1">
                                ${vt_ec2[i].tipo}
                            </td>
                            <td>
                                ${vt_ec2[i].vcpu}
                            </td>
                            <td>
                                ${vt_ec2[i].ram}
                            </td>
                            <td>
                                $ ${vt_ec2[i].preco}
                            </td>
                        </tr>`;
            }
        }
    }
}
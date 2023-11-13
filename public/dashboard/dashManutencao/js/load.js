const sidebarNomeUser = document.querySelector('#sidebar .sidebar-name');
const navNomeUser = document.querySelector('#profileDropdown .nav-profile-name');
const nomeServidor = document.querySelector('#infosServidor #nomeServidor');
const localidadeServidor = document.querySelector('#infosServidor #localidadeServidor');
const listagemServidores = document.querySelector('.table #listagemServidores');


const carregarNome = ()=>{
    sidebarNomeUser.innerText = localStorage.NOME_USUARIO;
    navNomeUser.innerText = localStorage.NOME_USUARIO;
}

const carregarInfosServidorSelecionado = (idServidor, localidade)=>{
    nomeServidor.innerText = "Servidor: " + idServidor;
    localidadeServidor.innerText = localidade;
}


const carregarServidoresTable = (listarServidores)=>{
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


const carregarServidorInic = ()=>{
    fetch(`/servidor/listarServidores`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    idServidorSelecionado = resposta[0].idServidor;

                    carregarInfosServidorSelecionado(idServidorSelecionado, resposta[0].localidade);
                    carregarServidoresTable(resposta);
                })
            }else {
                console.error("Nenhum dado encontrado");
            }
        })
        .catch(function (error) {
            console.error(
                `Erro na obtenção dos dados p/ locais dos servidores: ${error.message}`
            );
        });
}

window.onload = ()=>{
    carregarNome();
    carregarServidorInic();
}
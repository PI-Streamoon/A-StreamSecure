const sidebarNomeUser = document.querySelector('#sidebar .sidebar-name');
const navNomeUser = document.querySelector('#profileDropdown .nav-profile-name');
const listagemChamados = document.querySelector('.table #listagemChamados');
const interval = 10000;


// setInterval(() => {
//     totalChamadosPorPrioridade();
// }, interval);

const carregarChamadosTable = (listarChamados) => {
    for (let i = 0; i < listarChamados.length; i++) {
        let idChamado = listarChamados[i].idChamado;
        let statusChamado = listarChamados[i].isAberto ? "Aberto" : "Fechado"
        let checkboxChecked = listarChamados[i].isAberto ? '' : 'checked';
        
        listagemChamados.innerHTML += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td id="nomeChamado-${idChamado}"> ${listarChamados[i].titulo} </td>
            <td> ${statusChamado} </td>
            <td id="estadoChamado-${idChamado}"> ${listarChamados[i].prioridade} </td>
            <td>
                <input type="checkbox" id="checkboxChamado-${idChamado}" class="checkboxChamado" ${checkboxChecked}>
            </td>
        </tr>`    
        
    }
}


const totalChamados = () => {
    fetch(`/chamados/totalChamados`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    
                    console.log(resposta)

                    carregarChamadosTable(resposta);
                })
            } else {
                console.error("Nenhum dado encontrado");
            }
        })
        .catch(function (error) {
            console.error(
                `Erro na obtenção dos dados p/ chamados: ${error.message}`
            );
        });
}

const totalChamadosPorPrioridade = () => {
    fetch(`/chamados/totalChamadosPorPrioridade`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    plotarGraficoDonut(resposta[0])

                })
            } else {
                console.error("Nenhum dado encontrado");
            }
        })
        .catch(function (error) {
            console.error(
                `Erro na obtenção dos dados p/ chamados: ${error.message}`
            );
        });
}

function plotarGraficoDonut(contagem) {
    const labels = Object.keys(contagem);
    const data = Object.values(contagem);

    const ctx = document.getElementById('doughnutChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data.map(value => parseInt(value, 10)),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        }
    });
}



const carregarNome = () => {
    sidebarNomeUser.innerText = localStorage.NOME_USUARIO;
    navNomeUser.innerText = localStorage.NOME_USUARIO;
}


window.onload = () => {
    carregarNome();
    totalChamados();
    totalChamadosPorPrioridade();
}
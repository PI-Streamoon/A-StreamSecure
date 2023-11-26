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

function openChamado() {
    var titulo = document.getElementById("titulo").value;
    var descricao = document.getElementById("descricao").value;
    var prioridade = document.getElementById("prioridade").value;
    var responsavel = document.getElementById("responsavel").value;
    var dataAtual = new Date();

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    };

    const dataFormatada = new Intl.DateTimeFormat('en-US', options).format(dataAtual);
    const dataMySQLFormatada = dataFormatada.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$3-$1-$2 $4:$5:$6');

    console.log(dataMySQLFormatada)
    console.log(titulo);
    console.log(descricao);
    console.log(prioridade);
    console.log(responsavel);

    

    fetch("../../chamados/abrirChamado", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    tituloServer: titulo,
    descricaoServer: descricao,
    prioridadeServer: prioridade,
    dataServer: dataMySQLFormatada,
    responsavelServer: responsavel,
  }),
})
  .then(function (resposta) {
    console.log("resposta: ", resposta);

    if (resposta.ok) {
      alert("Chamado realizado com sucesso!");

    } else {
      throw "Houve um erro ao tentar realizar o chamado!";
    }
  })
  .catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
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
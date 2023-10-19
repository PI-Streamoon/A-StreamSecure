const tbodyFuncionarios = document.getElementById('tbody_funcionarios');

function buscarFuncionarios() {
    fetch(`/usuarios/listar?fkAdmin=${localStorage.ID_USUARIO}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.forEach(linha => {
                    let tr = document.createElement('tr');

                    let tdUID = document.createElement('td');
                    let tdNome = document.createElement('td');
                    let tdEmail = document.createElement('td');
                    
                    tdUID.innerText = linha['idUsuario'];
                    tdNome.innerText = linha['nome'];
                    tdEmail.innerHTML = `<a href="mailto: ${linha['email']}"> ${linha['email']} </a>`;
                    
                    tr.appendChild(tdUID);
                    tr.appendChild(tdNome);
                    tr.appendChild(tdEmail);

                    tbodyFuncionarios.appendChild(tr);
                });
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

buscarFuncionarios()

buscarFuncionarios()
const tbodyFuncionarios = document.getElementById('tbody_funcionarios');

function buscarFuncionarios() {
    fetch(`/usuarios/listar?fkAdmin=${localStorage.ID_USUARIO}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.forEach(linha => {
                    tbodyFuncionarios.innerHTML = "";

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

var anim
openModalCadastro()

function openModalCadastro() {
    document["body"].innerHTML += `
    <div id="modal" class="modal-cadastro">
    <div id="container">
        <div id="imagemLogo">
            <a href="./index.html"><img id="logo" src="./img/logo.png" alt="" /></a>
        </div>
        <div id="title">
            <h1>NOVO CADASTRO</h1>
            <div id="textUnderline"></div>
        </div>

        <div class="container-inputs">
            <div class="part-input">
                <div class="inputs">
                    <p>Email</p>
                    <input type="text" id="emailUsuario" />
                </div>
                <div class="inputs">
                    <p>Nome</p>
                    <input type="text" id="nomeUsuario" />
                </div>
            </div>

            <div class="part-input">
                <div class="inputs">
                    <p>CPF</p>
                    <input type="text" id="cpfUsuario" />
                </div>
                <div class="inputs">
                    <p>Código da empresa</p>
                    <select name="empresas" id="codEmpresa">
                        <option value="null" disabled selected>Selecione sua empresa</option>
                    </select>
                </div>
            </div>

            <div class="part-input">
                <div class="inputs">
                    <p>Senha</p>
                    <input type="password" id="senhaUsuario" />
                </div>
                <div class="inputs">
                    <p>Confirmação de Senha</p>
                    <input type="password" id="confSenha" />
                </div>
<
            </div>
        </div>
        <button class="mb-5 button-cadastrar" onclick="registerUser()">Cadastrar</button>

        
    </div>
    <div class="right-container">
        <img id="astronautaImg" src="img/img-cadastro.jpg" alt="" />
        <button class="button-dash button-close" id="close-button"></button>
    </div>

</div>

    `

    var closeButton = document.getElementById('close-button');
      // Set up our animation 

    var animData = {
        container: closeButton,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path : './js/close.json'
    };

    anim = bodymovin.loadAnimation(animData);

    anim.gotoFrame(10)

    closeButton.onmouseover = ()=>{
        if(anim.isPaused){
            anim.playSegments([0, 28], true)
        }
    }

    closeButton.onclick = ()=>{
        closeModalCadastro()
    }
}

function closeModalCadastro(){
    document["body"].removeChild(document.getElementById('modal'))
}
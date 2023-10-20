toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

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
                    <p>Senha</p>
                    <input type="password" id="senhaUsuario" />
                </div>
               
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

    var anim = bodymovin.loadAnimation(animData);

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

function registerUser() {
    var nomeVar = nomeUsuario.value;
    var cpfVar = cpfUsuario.value.replaceAll('.', '').replace('-', '');
    var emailVar = emailUsuario.value; //Obrigatório
    var psswdVar = senhaUsuario.value; //Obrigatório

    var verif_blank =
      psswdVar == "" &&
      emailVar == "" &&
      nomeVar == "" &&
      cpfVar == ""
    var verif_emailUser = emailVar.indexOf("@") == -1 || emailVar == "";
    var verifCpf = cpfVar.length < 11;

    //Verificações
    if (verif_blank) {
      //Nenhum campo preenchido
      toastr.error("<b style='font-family: arial;'>Todos os campos estão vazios, preencha-os corretamente!</b>")
      return false;
    } else {
      if (verif_emailUser) {
        toastr.error("<b style='font-family: arial;'>O e-mail deve ser preenchido corretamente</b>")
        return false;
      }
      if (verifCpf) {
        toastr.error("<b style='font-family: arial;'>O CPF é inválido</b>")
        return false;
      }
    }
    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        cpfServer: cpfVar,
        empresaServer: codEmpresaVar,
        emailServer: emailVar,
        senhaServer: psswdVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          alert("Cadastro realizado com sucesso! Redirecionando para o Login");

          setTimeout((window.location = "login.html"), 2000);
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
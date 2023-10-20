const tbodyFuncionarios = document.getElementById('tbody_funcionarios');
const modal = document.getElementById('modal');
const navNomeUsuario = document.getElementById('nomeUsuario');
const closeButton = document.getElementById('close-button');

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


function buscarFuncionarios() {
    tbodyFuncionarios.innerHTML = "";

    fetch(`/usuarios/listar?fkAdmin=${localStorage.ID_USUARIO}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.forEach(linha => {

                    let tr = document.createElement('tr');

                    let tdUID = document.createElement('td');
                    let tdNome = document.createElement('td');
                    let tdEmail = document.createElement('td');
                    let tdNivel = document.createElement('td');
                    let checkBox = document.createElement('input');

                    checkBox.type = 'checkbox';
                    checkBox.checked = resposta['fkAdmin'] == 'null';
                    checkBox.onclick =

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
    modal.style.display = "flex";
}

function closeModalCadastro(){
    modal.style.display = "none";
}

function registerUser() {
    var nomeVar = iptNomeUsuario.value;
    var cpfVar = iptCpfUsuario.value.replaceAll('.', '').replace('-', '');
    var emailVar = iptEmailUsuario.value;
    var psswdVar = iptSenhaUsuario.value;

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

    console.log({
        nomeServer: nomeVar,
        cpfServer: cpfVar,
        empresaServer: localStorage.FK_EMPRESA,
        fkAdminServer: localStorage.ID_USUARIO,
        emailServer: emailVar,
        senhaServer: psswdVar,
      })

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        cpfServer: cpfVar,
        empresaServer: localStorage.FK_EMPRESA,
        fkAdminServer: localStorage.ID_USUARIO,
        emailServer: emailVar,
        senhaServer: psswdVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {

            toastr.success("Cadastro realizado com sucesso!");

            buscarFuncionarios();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
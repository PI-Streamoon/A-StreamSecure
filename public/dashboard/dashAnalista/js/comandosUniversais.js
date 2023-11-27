carregarPagina()

function carregarPagina() {
    var nome = localStorage.NOME_USUARIO;

    nomeHeader.innerHTML = nome;
    nomeSidebar.innerHTML = nome;
    cargo.innerHTML = "Analista de dados";
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
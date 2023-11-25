const sidebarNomeUser = document.querySelector('#sidebar .sidebar-name');
const navNomeUser = document.querySelector('#profileDropdown .nav-profile-name');
const interval = 2000;


// setInterval(() => {
//     ultimasMedidas();
//     checarFalhas();
// }, interval);




const carregarNome = () => {
    sidebarNomeUser.innerText = localStorage.NOME_USUARIO;
    navNomeUser.innerText = localStorage.NOME_USUARIO;
}


window.onload = () => {
    carregarNome();
}
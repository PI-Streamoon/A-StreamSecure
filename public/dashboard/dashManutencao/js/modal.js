const moonAssistantModal = document.getElementById('moonAssistant-Modal');
var isClosed = true;


const turnModalMoonAssistant = (element)=>{
    let img = element.getElementsByTagName('img')[0];

    isClosed ? element.classList.remove('pulse-anim') : element.classList.add('pulse-anim');

    img.src = isClosed ? "https://img.icons8.com/ios/50/ffffff/delete-sign.png" : "https://img.icons8.com/ios/50/ffffff/astronaut.png";
    img.className = isClosed ? "" : "icon";

    moonAssistantModal.style.right = isClosed ? '0px' : '-100vw';

    document.body.style.overflowY = isClosed ? 'hidden' : 'auto';

    isClosed = !isClosed;
}

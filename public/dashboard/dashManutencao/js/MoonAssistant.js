const moonAssistantModal = document.getElementById('moonAssistant-Modal');
const iptMessage = document.getElementById('ipt-message');
const containerMessages = document.getElementById('messages');
const buttonSendMessage = document.getElementById('buttonSendMessage');
const spanButtonSendMessage = buttonSendMessage.getElementsByTagName('span')[0];

var isClosed = true;
var hasDadosFalhas = false;
var hasDadosMonitoramento = false;
var hasError = false;

iptMessage.onkeyup = (e)=>{
    if (e.key === "Enter") {
        sendMessage();
    }
}

const turnModalMoonAssistant = (elementOrigin)=>{
    let img = elementOrigin.getElementsByTagName('img')[0];

    isClosed ? elementOrigin.classList.remove('pulse-anim') : elementOrigin.classList.add('pulse-anim');

    img.src = isClosed ? "https://img.icons8.com/ios/50/ffffff/delete-sign.png" : "https://img.icons8.com/ios/50/ffffff/astronaut.png";
    img.className = isClosed ? "" : "icon";

    moonAssistantModal.style.right = isClosed ? '0px' : '-100vw';

    document.body.style.overflowY = isClosed ? 'hidden' : 'auto';

    isClosed = !isClosed;
}

const turnDadosFalhas = (elementOrigin)=>{
    if(hasDadosFalhas){
        hasDadosFalhas = false;

        elementOrigin.classList.remove('badge-success');
        elementOrigin.classList.add('badge-light');
    }else{
        hasDadosFalhas = true;

        elementOrigin.classList.remove('badge-light');
        elementOrigin.classList.add('badge-success');
    }
}

const turnDadosMonitoramento = (elementOrigin)=>{
    if(hasDadosMonitoramento){
        hasDadosMonitoramento = false;

        elementOrigin.classList.remove('badge-success');
        elementOrigin.classList.add('badge-light');
    }else{
        hasDadosMonitoramento = true;

        elementOrigin.classList.remove('badge-light');
        elementOrigin.classList.add('badge-success');
    }
}

const turnSpinner = (spinner)=>{
    if(spinner){
        buttonSendMessage.onclick = '';
        spanButtonSendMessage.classList.remove('fa-arrow-right');
        spanButtonSendMessage.classList.add('fa-spinner');
    }else{
        spanButtonSendMessage.classList.remove('fa-spinner');
        spanButtonSendMessage.classList.add('fa-arrow-right');
        buttonSendMessage.onclick = ()=>{sendMessage()};
    }
}

const addMsgFront = (bot, message)=>{
    let markedReplace = marked.parse(message)
        .replaceAll("<table>", "<div class='overflow-auto'><table class='table'>")
        .replaceAll('</table>', '</table></div>')

    containerMessages.innerHTML += `
        <div class="d-flex flex-column overflow-hidden text-black font-weight-bold ${bot ? 'float-left' : 'float-right'} bg-white mt-3 box-message">
            ${bot ? '<img class="moonAssistant-icon" src="https://img.icons8.com/ios/50/ffffff/astronaut.png">' : ''}
            <span class="m-3 message_text">${markedReplace}</span>
        </div>
    `;

    containerMessages.scrollTop = containerMessages.scrollHeight;
}

const inserirTextoPosicao = (original, texto, posicao) => {
    return original.slice(0, posicao) + texto + original.slice(posicao);
}

const tratarResposta = (resposta) =>{
    var content = resposta['content'];
    var images = resposta['images'];
    var lastSimbolMarkdownImage = 0;

    images.forEach((link)=>{
        let firstSimbolMarkdownImage = content.indexOf('[Image of', lastSimbolMarkdownImage);
        lastSimbolMarkdownImage = content.indexOf(']', firstSimbolMarkdownImage)+2;
        content = inserirTextoPosicao(content, '!', firstSimbolMarkdownImage);
        content = inserirTextoPosicao(content, `(${link})`, lastSimbolMarkdownImage);
    })

    return content;
}

const showInfo = ()=>{
    addMsgFront(true, "Para enviar uma mensagem, por favor, redija-a no campo abaixo.\nCaso deseje adicionar um conjunto de dados à sua mensagem, utilize os botões localizados acima do campo de escrita (conforme indicado na imagem abaixo).\n![Botões Dataset](./img/btDataset.png)");
}

const sendMessage = ()=>{
    let message = iptMessage.value;

    if(message.trim().length > 0){
        iptMessage.value = '';

        turnSpinner(true);

        hasError = false;
        addMsgFront(false, message);
      
        const opcoesReq = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'messageServer': message,
            'hasMonitoramentoServer': hasDadosMonitoramento,
            'hasFalhasServer': hasDadosFalhas,
            'idServidorServer': idServidorSelecionado
        })
        };
        
        fetch('/MoonAssistant/send', opcoesReq).then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then(function (resposta) {
                    message = tratarResposta(resposta);

                    addMsgFront(true, message);

                    turnSpinner(false);
                });
            } else {
                response.json().then(function (respostaError) {
                    if(respostaError == "Texto Muito Longo"){
                        addMsgFront(true, "Minha aplicação está nos estágios iniciais, limitada a 5000 caracteres; por favor, desconsidere conjuntos de dados ou reduza a mensagem.");
                    
                        turnSpinner(false);
                    }else{
                        addMsgFront(true, "Houve Um Erro. Por Favor tente mais tarde");

                        turnSpinner(false);
                    }
                });
            }
        })
        .catch(function (error) {
            addMsgFront(true, "Houve Um Erro. Por Favor tente mais tarde");
            console.error(`Erro na obtenção dos dados`);
        });

    }else if(!hasError){
        hasError = true;
        addMsgFront(true, "Por favor insira uma mensagem para que eu possa te ajudar.");
    }
}
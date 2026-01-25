/* 
Lógica de Programacao
    - Falar a lingua do computador
Algoritmo
    - Receita de bolo. Os passos na sequencia certa

JavaScript
    - Variáveis - pedacinho na memória do computador
        que voce pode guardar o que voce quiser

    - Funcoes
        pedacinho de código que, só executa quando
        eu chamo
        
    - Como se comunicar com o HTML
        Manipular a DOM

    console.log() mostra o que eu quiser na tela

    [x] Saber quando o botão foi clicado
    [x] Pegar o texto que o usário digitou
    [x] Mando para o servidor traduzir
    [x] Receber a resposta do servidor (traducao)  
    [ ] Colocar o texto na tela   

    // JavaScript - scripts
    // HTML - document
    querySelector - procurar alguem no HTML
    value = valor - o texto que tem nele

   padrao =  https://api.mymemory.translated.net/get?q=
   traduzir =  Hello World!
   idioma = &langpair=pt-BR|en

   fetch / ferramenta do javascript para entrar em contato com um servidor
   await (Espere) - async (async & await)
   json (formato mais amigavel)

*/

let inputTexto = document.querySelector(".input-texto")
let traducaoTexto = document.querySelector(".traducao")
let idiomaSelect = document.querySelector(".idioma")

async function traduzir() {
    /*Sempre que colocar o await para esperar, tem que inserir o async na função*/

    // endereço do servidor com o texto que quero traduzir
    let endereco = "https://api.mymemory.translated.net/get?q="
        + inputTexto.value
        + "&langpair=pt-BR|"
        + idiomaSelect.value

    // resposta do servidor
    let resposta = await fetch(endereco)

    // converto a resposta para um formato mais amigável
    let dados = await resposta.json()

    traducaoTexto.textContent = dados.responseData.translatedText

    console.log(dados)
}

/* 🔹 NOVO: traduz automaticamente ao digitar */
inputTexto.addEventListener("input", () => {
    if (inputTexto.value.trim() !== "") {
        traduzir()
    }
})

/* 🔹 COMPLETANDO a função que estava vazia */
function ouvirVoz() {

    const SpeechRecognition =

    //ferramente de transcricao de audio para texto
        window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
        alert("Seu navegador não suporta reconhecimento de voz.")
        return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "pt-BR"
    recognition.start()

    recognition.onresult = function (event) {
        inputTexto.value = event.results[0][0].transcript
        traduzir()
    }

    recognition.onerror = function () {
        alert("Erro ao reconhecer a voz.")
    }
}

// clicou no botao -> chama a funcao -> monto o enderco ->
// chamo o servidor -> peco esperar -> responde 
const alternativas = document.querySelectorAll(".alternativa");
const nextStepAtv1 = document.getElementById('nextStepAtv1');
const enunciado = document.getElementById("enunciadoQuadradoVerde");
const pontos = document.querySelector(".pontos span");
var alternativa1 = document.querySelector(".alternativa.primeira span");
var alternativa2 = document.querySelector(".alternativa.segunda span");
var alternativa3 = document.querySelector(".alternativa.terceira span");

const imgAcertoErro = document.querySelectorAll("#acertoOuErro");

window.count = 1

alternativas.forEach(elem => {
    elem.addEventListener("click", click);
});

function animaRoboCorreto() {

}

function animaRoboErrado() {

}

// funcao que mostra a imagem de erro ou acerto, ela recebe a img e recebe 1 ou 0 para avariavel acerto, se acerto = 1,se erro = 0
function acertouErrou(img, acerto) {
    // retira a classe naoMostra da imagem qeu tem o certo ou errado e retira a classe alternativas para qeu elas subam
    img.classList.add('fade-in')
    img.classList.remove('naoMostra')
    if (acerto == 0) {
        setTimeout(function() {
            img.classList.add('naoMostra')
        }, 500);
    }
}

function tiraPontos() {
    pontosAtuais = pontos.innerHTML
    pontos.innerHTML = parseInt(pontosAtuais) - 5
}

function somaPontos() {
    pontosAtuais = pontos.innerHTML
    pontos.innerHTML = parseInt(pontosAtuais) + 20
}

function blokElemen(elem, blok) {
    if (blok == 1) {
        elem.forEach(elemento => {
            elemento.style.opacity = "0.7"
            elemento.style.pointerEvents = "none"
        })
    } else {
        elem.forEach(elemento => {
            elemento.style.opacity = "1"
            elemento.style.pointerEvents = "auto"
        })
    }
}

function showBotaoNext() {
    if (nextStepAtv1.classList.contains('naoMostra')) {
        setTimeout(function() {
            nextStepAtv1.classList.remove('fade-in')
            nextStepAtv1.classList.remove('naoMostra')
        }, 500);
    } else {
        nextStepAtv1.classList.add('naoMostra')
    }

}

function nextPageAtv30(pagina) {

    imgAcertoErro.forEach(elem => {
        elem.classList.add('naoMostra')
    });

    showBotaoNext()
    blokElemen(alternativas, 0)

    if (window.count == 2) {
        enunciado.innerHTML = "As propriedades das Operações matemáticas são:"

        alternativa1.innerHTML = "Ordem, Classes, Parcela e Resultado"
        document.querySelector(".alternativa.primeira .circuloAlternativa img").src = "../img/errou.png"
        document.querySelector(".alternativa.primeira").id = ""

        alternativa2.innerHTML = "Fechamento, associatividade, Elemento Neutro, Elemento Nulo, e Comutatividade"
        document.querySelector(".alternativa.segunda .circuloAlternativa img").src = "../img/acertou.png"
        document.querySelector(".alternativa.segunda").id = "correto"

        alternativa3.innerHTML = "Elementos Neutros e de Fechamento, Parcelas e Resultados"
    } else if (window.count == 3) {
        enunciado.innerHTML = "Nas operações da <b>Adição</b>, os elementos são classificados como:"

        alternativa1.innerHTML = "Multiplicador, Multiplicando e Produto"

        alternativa2.innerHTML = "Minuendo, Subtraendo, Resto ou Diferença"
        document.querySelector(".alternativa.segunda .circuloAlternativa img").src = "../img/errou.png"
        document.querySelector(".alternativa.segunda").id = ""

        alternativa3.innerHTML = "1ª Parcela, 2ª Parcel, Roma ou Total"
        document.querySelector(".alternativa.terceira .circuloAlternativa img").src = "../img/acertou.png"
        document.querySelector(".alternativa.terceira").id = "correto"
    } else if (window.count == 4) {
        enunciado.innerHTML = "Nas operações da <b>Multiplicação</b>, os elementos são classificados como:"

        alternativa1.innerHTML = "Multiplicador, Multiplicando e Produto"
        document.querySelector(".alternativa.primeira .circuloAlternativa img").src = "../img/acertou.png"
        document.querySelector(".alternativa.primeira").id = "correto"

        alternativa2.innerHTML = "Minuendo, Subtraendo, Resto ou Diferença"

        alternativa3.innerHTML = "1ª Parcela, 2ª Parcel, Roma ou Total"
        document.querySelector(".alternativa.terceira .circuloAlternativa img").src = "../img/errou.png"
        document.querySelector(".alternativa.terceira").id = ""
    }
}

function click() {
    // percorre o array de filhos da div procurando a imagem com o id acertoOuErro
    this.childNodes.forEach(elem => {
        img = this.querySelectorAll("#acertoOuErro")

    })

    // verifica se o item clicado bate com as respostas , seja ele operador ou alternativa
    if (this.id == 'correto') {
        // aumenta 1 ao contador que verifica qual etapa esta
        window.count++
            acertouErrou(img[0], 1)
        animaRoboCorreto()
        somaPontos();
        blokElemen(alternativas, 1)

        if (window.count <= 4) {
            showBotaoNext()
        } else {
            setTimeout(function() {
                showParabens();
            }, 1000);
        }

        // se nao bate com as respostas entra aqui, CHAMA A funcao de mostrar imagem de acerto ou erro
    } else {
        acertouErrou(img[0], 0)
        animaRoboErrado()
        tiraPontos();
    }
}
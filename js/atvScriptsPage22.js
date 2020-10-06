const calculos = document.querySelectorAll(".colunaCalc .calcEimagem .calc");
const parabens = document.getElementById("parabens")
const audio = new Audio('../audio/parabens.mp3')

calculos.forEach(elem => {
    elem.addEventListener("click", click);
});

window.count = 0

function click() {

    this.childNodes.forEach(elem => {
        img = this.parentElement.querySelectorAll("#acertoOuErro")
    })

    var elemento = this.parentElement.parentElement

    if (this.id == 'correto') {
        window.count++
            acertou(img, elemento)

    } else {
        errou(img, elemento)
    }

    if (window.count == 4) {
        chamaCongrats()
    }
}

function chamaCongrats() {
    setTimeout(function() {
        audio.play()
        parabens.classList.remove("naoMostra")
        parabens.classList.add("parabens")
    }, 1000);

    setTimeout(function() {
        parabens.classList.add("naoMostra")
    }, 4000);
}

function acertou(img, elemento) {

    img[0].classList.add('fade-in')
    img[0].classList.remove('naoMostra')

    elemento.style.opacity = "0.7"
    elemento.style.pointerEvents = "none"
}

function errou(img, elemento) {
    elemento.style.pointerEvents = "none"
    img[0].classList.add('fade-in')
    img[0].classList.remove('naoMostra')

    setTimeout(function() {
        img[0].classList.add('naoMostra')
        elemento.style.pointerEvents = "auto"
    }, 500);
}
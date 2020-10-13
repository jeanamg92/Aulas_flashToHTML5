const calculos = document.querySelectorAll(".colunaCalc .calcEimagem .calc");


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
        showParabens()
    }
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
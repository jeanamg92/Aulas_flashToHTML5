function getElement(tipo, elem) {
    if (tipo == "select") {
        return document.querySelector(elem)
    } else if (tipo == "id") {
        return document.getElementById(elem)
    } else if (tipo == "selectAll") {
        return document.querySelectorAll(elem)
    }
}
const draggableElements = getElement("selectAll", ".draggable")
const droppableElements = getElement("selectAll", ".dropable");

const acertouImg = getElement("selectAll", "#acertou");
const errouImg = getElement("selectAll", "#errou")

window.acertos = 0


function acertou(img, elemento, itemDraggable) {

    itemDraggable.classList.add('transparent')
    itemDraggable.style.pointerEvents = "none"
    itemDraggable.removeAttribute('draggable')
    itemDraggable.style.opacity = "0.7"

    img[0].classList.add('fade-in')
    img[0].classList.remove('naoMostra')

    elemento.style.opacity = "0.7"
    elemento.style.pointerEvents = "none"
    setTimeout(function() {
        img[0].classList.add("naoMostra")
    }, 1000);
}

function errou(img) {
    img[0].classList.add('fade-in')
    img[0].classList.remove('naoMostra')

    setTimeout(function() {
        img[0].classList.add('naoMostra')
    }, 1000);
}

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
});

droppableElements.forEach(elem => {
    elem.addEventListener("dragover", function dragover(event) {
        event.preventDefault();
    });
    elem.addEventListener("drop", function drop(event) {
        if (event.dataTransfer.getData("text") == event.target.getAttribute("result")) {
            event.target.innerHTML = event.dataTransfer.getData("text")
            var itemDraggable = getElement("id", '' + event.dataTransfer.getData("text"));
            acertou(acertouImg, event.target, itemDraggable)

            window.acertos++

        } else {
            errou(errouImg)
        }

        if (window.acertos == droppableElements.length) {
            showParabens();
        }
    });
});

function showParabens(onend = undefined) { //onend = função pra ser chamada depois que o parabens sumir
    document.getElementById('parabens-wrapper').classList.remove('hidden');

    const sfxParabens = document.getElementById('SFX-parabens');
    if (sfxParabens) {
        sfxParabens.currentTime = 0;
        sfxParabens.muted = false;
        sfxParabens.volume = 0.85;
        sfxParabens.play();
    }

    setTimeout(() => {
        document.getElementById('parabens-wrapper').classList.add('hidden');

        if (onend != undefined)
            onend();
    }, 4250)
}

// funcoes drag and drop
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}
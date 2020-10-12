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

const parabens = getElement("id", "parabens")
const audio = new Audio('../audio/parabens.mp3')

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
            chamaCongrats();
        }
    });
});

// function chamaCongrats() {
//     setTimeout(function() {
//         audio.play()
//         parabens.classList.remove("naoMostra")
//         parabens.classList.add("parabens")
//     }, 3000);

//     setTimeout(function() {
//         parabens.classList.add("naoMostra")
//     }, 7000);
// }

// function acertou(acertouImg, targetElem, itemDraggable) {

//     itemDraggable.classList.add('transparent')
//     itemDraggable.style.pointerEvents = "none"
//     itemDraggable.removeAttribute('draggable')

//     acertouImg[0].classList.add('fade-in')
//     acertouImg[0].classList.remove('naoMostra')

//     // targetElem.style.opacity = "0.7"
//     targetElem.style.pointerEvents = "none"
//     setTimeout(function() {
//         acertouImg[0].classList.add("naoMostra")
//     }, 1000);

// }

// function errou(errouImg) {
//     errouImg[0].classList.add('fade-in')
//     errouImg[0].classList.remove('naoMostra')

//     setTimeout(function() {
//         errouImg[0].classList.add('naoMostra')
//     }, 1000);
// }

// funcoes drag and drop
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}
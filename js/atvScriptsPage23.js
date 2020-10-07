const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".dropable");

const acertou = document.getElementById("acertou");
const errou = document.getElementById("errou")

const parabens = document.getElementById("parabens")
const audio = new Audio('../audio/parabens.mp3')

window.acertos = 0
window.calculo = 1
draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    elem.addEventListener("drag", drag);
    elem.addEventListener("dragend", dragEnd);
});

droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
});

// funcoes drag and drop
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drag(event) {

}

function dragEnd(event) {

}

function dragEnter(event) {

}

function dragOver(event) {
    event.preventDefault();
}

function dragLeave(event) {

}

function drop(event) {
    event.preventDefault();

    const draggableElementData = event.dataTransfer.getData("text")
    const droppableElementData = event.target.getAttribute("id")

    console.log(draggableElementData)
    console.log(droppableElementData)

    if (draggableElementData == droppableElementData && event.target.innerHTML == "") {
        event.target.innerHTML = document.getElementById(draggableElementData).innerHTML
        event.target.disable = "true"
        event.target.style.opacity = "0.7"

        document.querySelector('.colunaElementos > #' + draggableElementData).classList.add('transparent')
        document.querySelector('.colunaElementos > #' + draggableElementData).pointerEvents = "none"

        acertou.classList.remove("naoMostra")
        setTimeout(function() {
            acertou.classList.add("naoMostra")
        }, 1000);

        window.acertos++
    } else if (!(draggableElementData == droppableElementData) && event.target.innerHTML == "") {
        errou.classList.remove("naoMostra")
        setTimeout(function() {
            errou.classList.add("naoMostra")
        }, 1000);
    } else {
        return
    }

    var elemento = this.parentElement.parentElement


    if (window.acertos == 3 && !(elemento.id == 4)) {
        window.acertos = 0

        setTimeout(function() {
            elemento.classList.add('up-outscreen-translated')
            var nextOp = Number(elemento.id) + 1;
            document.getElementById(nextOp).classList.remove('transparent', 'bottom-outscreen-translated')
        }, 1250);

    }

    if (window.acertos == 4) {
        setTimeout(function() {
            elemento.classList.add('up-outscreen-translated')
            var nextOp = Number(elemento.id) + 1;
            document.getElementById(nextOp).classList.remove('transparent', 'bottom-outscreen-translated')
        }, 1250);
        setTimeout(function() {
            audio.play()
            parabens.classList.remove("naoMostra")
            parabens.classList.add("parabens")
        }, 1000);

        setTimeout(function() {
            parabens.classList.add("naoMostra")
        }, 4000);
    }

}
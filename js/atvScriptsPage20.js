const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".dropable");
const acertou = document.getElementById("acertou");
const errou = document.getElementById("errou")


window.acertos = 0
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

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

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
    const droppableElementData = event.target.getAttribute("result")

    if (draggableElementData == droppableElementData && event.target.innerHTML == "") {
        event.target.innerHTML = draggableElementData
        event.target.disable = "true"
        event.target.style.opacity = "0.7"

        acertou.classList.remove("naoMostra")
        setTimeout(function() {
            acertou.classList.add("naoMostra")
        }, 1000);
        window.acertos++
            console.log(window.acertos)
    } else if (!(draggableElementData == droppableElementData) && event.target.innerHTML == "") {
        errou.classList.remove("naoMostra")
        setTimeout(function() {
            errou.classList.add("naoMostra")
        }, 1000);
    } else {
        return
    }

    if (window.acertos == droppableElements.length) {
        setTimeout(function() {
            showParabens();
        }, 1000);
    }
}
const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".dropable");

draggableElements.forEach(elem => {
    elem.addEventListener("dragstar", dragStart);
});

// droppableElements.forEach(elem => {
//     elem.addEventListener("dragover", dragOver);
//     elem.addEventListener("drop", drop);
// });

// funcoes drag and drop
function dragStart(event) {
    console.log("drain");
}
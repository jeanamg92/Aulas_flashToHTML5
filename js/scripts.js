const totalPaginas = 32;
//IMPORTANTE! - a composiçao do link tem que ser /Pages/paginax.html sempre

function nextPage() {
    const arrayOfStrings = document.getElementById("iframe").src.split("/");
    const idx = arrayOfStrings.indexOf("Pages") + 1;

    var nextPage = parseInt(arrayOfStrings[idx].replace(/\D/gim, ""), 10) + 1;

    if (nextPage.toString().length >= 3) {
        const nextPageStr = nextPage.toString().split('')
        const nextObj = nextPageStr.slice(1, 3)
        const nextPageStringfy = JSON.stringify(nextObj)
        nextPage = parseInt(nextPageStringfy.replace(/\D/gim, ""), 10);
    }

    if (nextPage <= totalPaginas) {
        arrayOfStrings[idx] = "page" + nextPage + ".html";
        // console.log(arrayOfStrings[idx])
        const srcString = arrayOfStrings.join("/");
        document.getElementById("iframe").src = srcString;
        document.getElementById("paginaAtual").innerHTML = ("00" + nextPage).slice(-2);
    }
}

function previousPage() {
    const arrayOfStrings = document.getElementById("iframe").src.split("/");
    const idx = arrayOfStrings.indexOf("Pages") + 1;

    var previousPage = parseInt(arrayOfStrings[idx].replace(/\D/gim, ""), 10) - 1;

    if (previousPage.toString().length >= 3) {
        const previousPageStr = previousPage.toString().split('')
        const nextObj = previousPageStr.slice(1, 3)
        const previousPageStringfy = JSON.stringify(nextObj)
        previousPage = parseInt(previousPageStringfy.replace(/\D/gim, ""), 10);
    }

    if (previousPage >= 1) {
        arrayOfStrings[idx] = "page" + previousPage + ".html";
        const srcString = arrayOfStrings.join("/");
        document.getElementById("iframe").src = srcString;
        document.getElementById("paginaAtual").innerHTML = ("00" + previousPage).slice(-2);
    }
}

function openFullscreen() {
    var elem = document.getElementById("myvideo");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari e Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
    }

    screen.orientation.lock("landscape");
}

function gotoPage(page) {
    const arrayOfStrings = document.getElementById("iframe").src.split("/");
    const idx = arrayOfStrings.indexOf("Pages") + 1;
    const previousPage = page;
    // if (previousPage >= 1) {
    arrayOfStrings[idx] = "page" + previousPage + ".html";
    const srcString = arrayOfStrings.join("/");
    document.getElementById("iframe").src = srcString;
    document.getElementById("paginaAtual").innerHTML = ("00" + previousPage).slice(-2);
    // }
}

function chamaMenu() {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('right-outscreen-translated')) {
        document.getElementById('menu').classList.remove('right-outscreen-translated');
    } else {
        document.getElementById('menu').classList.add('right-outscreen-translated');
    }
}

function removeClasseFS() {
    openFullscreen();
    document.getElementById('tudo').classList.remove('displayNone')
    document.getElementById('menu').classList.remove('displayNone')
    document.getElementById('overlay').classList.add('displayNone')
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function retiraClasse(text) {
    // console.log(text);
    document.getElementById('' + text).classList.add('showColor');
    sleep(100)
    document.getElementById('' + text).classList.remove('left-outscreen-translated');

}

function retiraClasseAtv(text) {
    // console.log(text);
    document.getElementById('' + text).classList.add('showColor');
    sleep(100)
    document.getElementById('' + text).classList.remove('bottom-outscreen-translated');

}

function addClasseAtv(text) {
    // console.log(text);
    document.getElementById('' + text).classList.remove('showColor');
    sleep(100)
    document.getElementById('' + text).classList.add('bottom-outscreen-translated');

}
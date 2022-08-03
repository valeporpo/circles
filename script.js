let htmlContainer = document.querySelector('body div.html')
let innerCircle = document.querySelector('body div.html div.circle')
let imgsName = [
   '7-samurai', // ok
   '13-assassins', //ok
   'yojimbo', // ok
   'sanjuro', // ok
   'equinox-flower', // ok
   'late-spring', // ok
   'end-of-summer', // ok
   'the-assassin', // ok
   'blood-thirsty',
   'gojira',
   'kagemusha'
]

let randNum = Math.floor(Math.random() * imgsName.length);
innerCircle.style.backgroundImage = 'url(img/' + imgsName[randNum] + '.jpg)'

let step = 0.001
addEventListener("load", function() {
    startAnimation(innerCircle)
});

function getScale(el) {
    let style = window.getComputedStyle(el)
    let matrix = new WebKitCSSMatrix(style.transform)
    let scaleObj = {
        'x' : matrix.a,
        'y' : matrix.d,
    }
    return scaleObj
}

function createNewCircle(prevEl) {
   let prevElId = prevEl.id
   let el = document.createElement('div')
   el.classList.add('circle')
   let idProg = Number(prevElId.substring(7)) + 1
   el.id = 'circle-' + idProg
   el.style.backgroundImage = 'url(img/' + extractBgImg(prevEl) + '.jpg)'
   return el
}

function extractBgImg(prevEl) {
    let randNum = Math.floor(Math.random() * imgsName.length)
    console.log(prevEl.style.backgroundImage)
    if(prevEl.style.backgroundImage.indexOf(imgsName[randNum]) == -1) {
        console.log('ok')
        return imgsName[randNum]
    } else {
        console.log('retry')
        return extractBgImg(prevEl) 
    }
    //
}

function removeGrandParent(currentEl) {
   if(currentEl.id.substring(7) > 1) {
    document.querySelector('div.circle#circle-' + Number(currentEl.id.substring(7) - 2)).remove()
   }
}

function startAnimation(el) {
    let animation
    animation = setInterval(function() {
        let xScale = getScale(el).x
        let yScale = getScale(el).y
        let xScaleNew = xScale + step
        let yScaleNew = yScale + step
        el.style.transform = 'translate(-50%, -50%) scale('+xScaleNew+', '+yScaleNew+')'
        if(xScaleNew == 0.95 || yScaleNew == 0.95) {
            let newCircle = createNewCircle(el)
            htmlContainer.append(newCircle)
            startAnimation(newCircle)
        } else if(xScaleNew >= 1 || yScaleNew >= 1) {
            removeGrandParent(el)
            clearInterval(animation)
        }
    }, 7)
}
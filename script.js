let htmlContainer = document.querySelector('body div.html')
let innerCircle = document.querySelector('body div.html div.circle')

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
   let PrevElId = prevEl.id
   let el = document.createElement('div')
   el.classList.add('circle')
   let idProg = Number(PrevElId.substring(7)) + 1
   el.id = 'circle-' + idProg
   return el
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
        if(xScaleNew == 0.75 || yScaleNew == 0.75) {
            let newCircle = createNewCircle(el)
            htmlContainer.append(newCircle)
            startAnimation(newCircle)
        } else if(xScaleNew >= 1 || yScaleNew >= 1) {
            removeGrandParent(el)
            clearInterval(animation)
        }
    }, 7)
}
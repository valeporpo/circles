let htmlContainer = document.querySelector('body div.html')
let innerCircle = document.querySelector('body div.html div.circle')
let animate
//let counter = 0
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



function createNewCircle() {
   let el = document.createElement('div')
   el.classList.add('circle')
   return el
}

function startAnimation(el) {
    let animate
    animate = setInterval(function() {
        let xScale = getScale(el).x
        let yScale = getScale(el).y
        let xScaleNew = xScale + step
        let yScaleNew = yScale + step
        el.style.transform = 'translate(-50%, -50%) scale('+xScaleNew+', '+yScaleNew+')'
        if(xScaleNew == 0.75 || yScaleNew == 0.75) {
            let newCircle = createNewCircle()
            htmlContainer.append(newCircle)
            startAnimation(newCircle)
        } else if(xScaleNew >= 1 || yScaleNew >= 1) {
            clearInterval(animate)
        }
    }, 7)
}
let innerCircle = document.querySelector('body div.parent-circle div.child-circle')
let animate
let counter = 0
let step = 0.001

animate = setInterval(scale, 7)

function getScale(el) {
    let style = window.getComputedStyle(el)
    let matrix = new WebKitCSSMatrix(style.transform)
    let scaleObj = {
        'x' : matrix.a,
        'y' : matrix.d,
    }
    return scaleObj
}

function scale() {
    let xScale = getScale(innerCircle).x
    let yScale = getScale(innerCircle).y
    let xScaleNew = xScale + step
    let yScaleNew = yScale + step
    innerCircle.style.transform = 'translate(-50%,-50%) scale('+xScaleNew+', '+yScaleNew+')'
    if(xScaleNew >= 1 || yScaleNew >= 1)
      clearInterval(animate)
    console.log()  
}
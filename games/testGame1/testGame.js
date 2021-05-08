let canvas;

function setup() {
    canvas = createCanvas(500, 200)
    canvas.parent("mainSide")
    canvas.style("display", "inline")
}
console.log("hello")
function draw() {
    background("white")
    textAlign(CENTER, CENTER)
    fill("black")
    textSize(100)
    text("Test", 255, 100)
}

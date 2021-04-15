let bird
let birdGroup
let stage = "game"
let canvas
let birdAnimation

function setup() {
    birdAnimation = loadImage("../../../../images/flappyBird/flappyBird.png")

    canvas = createCanvas(800, 600)
    canvas.parent("mainSide")
    canvas.style("display", "inline")

    bird = createSprite(400, 600, 400, 300)
    bird.scale = 0.15
    bird.addImage(birdAnimation)

    birdGroup = new Group()
    birdGroup.add(bird)
}
function draw() {
    if(stage == "game"){
        background("lightblue")
        drawSprites(birdGroup)
    }
}
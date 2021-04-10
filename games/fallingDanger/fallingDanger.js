//canvas
let canvas;

//groups
let meteoritesGroup

//sprites
let player

//groups
let playerGroup

//fonts
let gameOverFont

//other variables
let gameOver = false
let score = 0
let currentColor = "white"



//functions
function randomNumber(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}



function setup() {
    //creating & setting sprites
    player = createSprite(vw(26), vh(66.5), vh(7), vh(7))
    player.shapeColor = "lightblue"

    //creating groups
    playerGroup = new Group()
    meteoritesGroup = new Group()

    //assigning sprites to their groups
    playerGroup.add(player)

    //loading fonts
    gameOverFont = loadFont("fonts/game_over.ttf")

    //P5JS functions
    canvas = createCanvas(vw(52), vh(83))
    canvas.parent("mainSide")
    canvas.style("display", "inline")
    frameRate(60)
}

function changeColor(color) {
    if(color == "white"){
        currentColor = "black"
        return
    }
    if(color == "black"){
        currentColor = "white"
        return
    }
}

setInterval(function() {
    changeColor(currentColor)
}, 500)

function draw() {
    if(!gameOver){
        background("black")
        noStroke()
        fill("green")
        rect(0, vh(70), vw(70), vh(10));
        fill("#874f00")
        rect(0, vh(75), vw(70), vh(10));
        drawSprites(playerGroup)
        drawSprites(meteoritesGroup)
        textFont(gameOverFont)
        textAlign(CENTER, CENTER)
        textSize(vh(20))
        fill("yellow")
        text("Score: " + score, vw(26), vh(10))
        //controls
        if((keyIsDown(65) || keyIsDown(37)) && player.position.x >= 25){
            player.position.x = player.position.x - vw(0.3)
        }
        if((keyDown(68) || keyIsDown(39)) && player.position.x <= 775){
            player.position.x = player.position.x + vw(0.3)
        }
        if(randomNumber(0, 10) == 1){
            let objectSize = randomNumber(50, 75)
            let newObject = createSprite(randomNumber(75, 725), -75, objectSize, objectSize)
            newObject.shapeColor = "red"
            newObject.setVelocity(randomNumber(-2, 2), 7)
            console.log("newObject")
            meteoritesGroup.add(newObject)
        }
        meteoritesLoop:
        for(var i = 0; i != meteoritesGroup.length; i++){
            if(meteoritesGroup[i].overlap(player)){
                gameOver = true
            }
            if(meteoritesGroup[i].position.y > vh(100)){
                meteoritesGroup.remove(meteoritesGroup[i])
                score++
                break meteoritesLoop
            }
        }
    }else{
        background("black")
        textFont(gameOverFont)
        fill("white")
        textSize(200)
        textAlign(CENTER, CENTER)
        text("GAME OVER", 400, 200)
        textSize(120)
        fill("yellow")
        text("Score: " + score, 400, 300)
        textSize(80)
        fill(currentColor)
        text("Press space to play again", 400, 500)
        //if pressed space, return to game and restart it
        if(keyIsDown(32)){
            gameOver = false
            meteoritesGroup = new Group
            player.position.x = 400
            score = 0
        }
    }
}
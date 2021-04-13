//the snake terrain is 20*20
//all the variables
let terrainWidth = 20
let widthAndHeight = 600
let snake = [{type: "head", x: 6, y: 10}, {type: "body", x: 5, y: 10}, {type: "body", x: 4, y: 10}, {type: "body", x: 4, y: 10}, {type: "body", x: 4, y: 10}, {type: "body", x: 4, y: 10}]
let apples = []
let direction = "right"
let canvas
let timeoutForUpdate
let stage = "game"
let gameOverFont
let score = 0
let currentColor = "white"

setInterval(function() {
    changeColor(currentColor)
}, 500)

function setup() {
    canvas = createCanvas(widthAndHeight, widthAndHeight)
    canvas.parent("mainSide")
    canvas.style("display", "inline")
    gameOverFont = loadFont("fonts/game_over.ttf")
    frameRate(20)
}

function keyPressed() {
    if((keyCode == (65) || keyCode == (37)) && direction != "left" && direction != "right"){
        clearTimeout(timeoutForUpdate)
        direction = "left"
        updateSnake()
    }
    if((keyCode == (68) || keyCode == (39)) && direction != "right" && direction != "left"){
        clearTimeout(timeoutForUpdate)
        direction = "right"
        updateSnake()
    }
    if((keyCode == (87) || keyCode == (38)) && direction != "up" && direction != "down"){
        clearTimeout(timeoutForUpdate)
        direction = "up"
        updateSnake()
    }
    if((keyCode == (83) || keyCode == (40)) && direction != "down" && direction != "up"){
        clearTimeout(timeoutForUpdate)
        direction = "down"
        updateSnake()
    }
}

function drawSnake(bodyColor, headColor) {
    for(var i = 0; i != snake.length; i++){
        if(snake[i].type == "head"){
            fill(headColor)
            noStroke()
            rect(snake[i].x * 30, snake[i].y * 30, 30)
        }else{
            fill(bodyColor)
            noStroke()
            rect(snake[i].x * 30, snake[i].y * 30, 30)
        }
    }
}



function updateSnake() {
    for(var i = snake.length - 1; i != -1; i--){
        if(snake[i].type == "body"){
            snake[i].x = snake[i-1].x
            snake[i].y = snake[i-1].y
        }else{
            if(direction == "up"){
                snake[i].y = snake[i].y - 1
            }else if(direction == "down"){
                snake[i].y = snake[i].y + 1
            }else if(direction == "right"){
                snake[i].x = snake[i].x + 1
            }else{
                snake[i].x = snake[i].x - 1
            }
        }
    }
    timeoutForUpdate = setTimeout(function() {
        clearTimeout(timeoutForUpdate)
        updateSnake()
    }, 200)
}

function drawApples() {
    for(var i = 0; i != apples.length; i++){
        fill("red")
        rect(apples[i].x * 30, apples[i].y * 30, 30, 30)
    }
}

function addApple(xPos, yPos) {
    apples.push({x: xPos, y: yPos})
}

function checkDeath() {
    for(var i = 1; i != snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            stage = "game over"
        }
        
    }
    if(snake[0].x > 19 || snake[0].x < 0 || snake[0].y > 19 || snake[0].y < 0){
        stage = "game over"
    }
}

function checkApples() {
    if(snake[0].x == apples[0].x && snake[0].y == apples[0].y){
        addAppleInRightPlace()
        snake.push({type: "body", x: snake[snake.length - 1].x, y: snake[snake.length - 1].y})
        score++
    }
}

function addAppleInRightPlace() {
    var appleX = randomNumber(0, 19)
    var appleY = randomNumber(0, 19)

    while(true){
        var appleCanBePlaced = true
        for(var i = 0; i != snake.length; i++){
            if(snake[i].x == appleX && snake[i].y == appleY){
                appleCanBePlaced = false
            }
        }
        if(appleCanBePlaced == true){
            break
        }
    }
    apples = []
    addApple(appleX, appleY)
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

addApple(10, 10)

updateSnake()

function draw() {
    if(stage == "game"){
        background("#001640")
        checkDeath()
        checkApples()
        drawSnake("lightblue", "blue")
        drawApples()
        textSize(100)
        fill("yellow")
        textAlign(CENTER, CENTER)
        textFont(gameOverFont)
        text("Score: " + score, 300, 100)
    }else if (stage == "game over"){
        background("black")
        textFont(gameOverFont)
        fill("white")
        textSize(150)
        textAlign(CENTER, CENTER)
        text("GAME OVER", 300, 200)
        textSize(100)
        fill("yellow")
        text("Score: " + score, 300, 300)
        textSize(75)
        fill(currentColor)
        text("Press space to play again", 300, 500)
        //if pressed space, return to game and restart it
        if(keyIsDown(32)){
            stage = "game"
            snake = [{type: "head", x: 6, y: 10}, {type: "body", x: 5, y: 10}, {type: "body", x: 4, y: 10}]
            apples = []
            addApple(10, 10)
            direction = "right"
        }
    }
}

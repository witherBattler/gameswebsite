let canvas
let bird
let birdGroup
let stage = "game"
let birdAnimation
let pillars
let nextXForPillars = 800
let topPillarAnimation
let bottomPillarAnimation
let gameOverFont
let currentColor = "white"
let score = 0

setInterval(function() {
  changeColor(currentColor)
}, 500)

function setup() {
  frameRate(60)

  //fonts
  gameOverFont = loadFont("fonts/game_over.ttf")

  //animations
  birdAnimation = loadImage("../../images/flappyBird/flappyBird.png")
  topPillarAnimation = loadImage("../../images/flappyBird/topPillar.png")
  bottomPillarAnimation = loadImage("../../images/flappyBird/bottomPillar.png")

  //canvas
  canvas = createCanvas(800, 600)
  canvas.parent("mainSide")
  canvas.style("display", "inline")

  //groups
  birdGroup = new Group()
  pillars = new Group()
  
  //sprites
  bird = createSprite(50, 300)
  bird.addToGroup(birdGroup)
  bird.addImage("bird", birdAnimation)
  bird.scale = 0.2
}

function keyPressed() {
  if(keyCode == 32){
    flap()
  }
}

function flap() {
  bird.setVelocity(0, -7)
}

function birdPhysics() {
  bird.setVelocity(0, bird.velocity.y + 0.3)
}

function drawGame() {
  background("lightblue")
  drawSprites(pillars)
  fill(56, 217, 24)
  rect(0, 500, 800, 100)
  drawSprites(birdGroup)
  textFont(gameOverFont)
  textAlign(CENTER, CENTER)
  textSize(120)
  fill("yellow")
  text("Score: " + score, 400, 100)
}


function createPillars() {
  var randomY = randomNumber(200, 400)
  var topPillar = createSprite(nextXForPillars, randomY - 280)
  topPillar.scale = 0.8
  topPillar.addImage(topPillarAnimation)
  var bottomPillar = createSprite(nextXForPillars, randomY + 280)
  bottomPillar.scale = 0.8
  bottomPillar.addImage(bottomPillarAnimation)
  pillars.add(bottomPillar)
  pillars.add(topPillar)
  nextXForPillars += 400
}



function managePillars() {
  for(var i = 0; i != pillars.length; i++){
    pillars[i].position.x -= 3
  }
  var toDeletePillars = pillars.filter(pillar=>pillar.position.x<-1000)
  toDeletePillars.forEach(pillar=>pillars.remove(pillar))
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

function checkDeath() {
  if(pillars.overlap(bird)){
    stage = "game over"
  }
  if(bird.position.y > 469){
    stage = "game over"
  }
}

function draw() {
  if(stage == "game"){
    managePillars()
    if (frameCount % 1.5 * frameCount == 0) {
      createPillars();
    }
    birdPhysics()
    drawGame()
    checkDeath()
  }else if (stage == "game over"){
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
        stage = "game"
        score = 0
        bird.position.x = 50
        bird.position.y = 300
        pillars.removeSprites()
        frameCount = 60
        nextXForPillars = 800
    }
  }
}
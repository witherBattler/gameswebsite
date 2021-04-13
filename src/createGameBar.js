//Every game comes in an object of:
//1.name
//2.link
//3.image

//the image's size doesn't matter.
//an object without these parameters will not be able to work.

//just an example:
//[{image: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg", name: "Title", link: "link"}];

let games = [
    {
        image: "../images/gamesImages/fallingDanger.png", 
        name: "FallBlox", 
        link: "../games/fallingDanger/index.html"
    },

    {
        image: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
        name: "Snake",
        link: "../games/Snake/index.html"
    }
]

let body = document.getElementsByTagName("BODY")[0];




for(var i = 0; i != games.length; i++){
    let gameDiv = document.createElement("div")
    gameDiv.className = "gameDivLeft"
    document.getElementById("gamesList").appendChild(gameDiv)

    let gameImage = document.createElement("img")
    gameImage.setAttribute("src", games[i].image)
    gameImage.className = "gameImageLeft"
    gameDiv.appendChild(gameImage)

    let gameh1 = document.createElement("h1")
    gameh1.innerHTML = games[i].name
    gameh1.className = "gameH1Left"
    gameDiv.appendChild(gameh1)

    let gameButton = document.createElement("a")
    gameButton.innerHTML = "Play Game"
    gameButton.setAttribute("href", games[i].link)
    gameButton.className = "gameButtonLeft"
    gameDiv.appendChild(gameButton)
}
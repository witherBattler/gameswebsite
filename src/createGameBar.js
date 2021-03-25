//Every game comes in an object of:
//1.name
//2.link
//3.description
//4.image

//the image's size doesn't matter.
//an object without these parameters will not be able to work.

//just an example:
//[{image: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg", name: "Title", link: "link", description: "description here", color: "green", buttonColor: "red", titleColor: "red", descriptionColor: "red", buttonTextColor: "green"}];

let games = []
let body = document.getElementsByTagName("BODY")[0];

let menuButton = document.createElement("a")
menuButton.setAttribute("href", "../index.html")
menuButton.id = "menuButtonGameBar"
getElementById("gamesList").appendChild(menuButton)



for(var i = 0; i != games.length; i++){

    let gameDiv = document.createElement("div")
    gameDiv.className = "gameDivLeft"
    document.getElementById("gamesList").appendChild(gameDiv)
    gameDiv.style.backgroundColor = games[i].color

    let gameImage = document.createElement("img")
    gameImage.setAttribute("src", games[i].image)
    gameImage.className = "gameImageLeft"
    gameDiv.appendChild(gameImage)

    let gameh1 = document.createElement("h1")
    gameh1.innerHTML = games[i].name
    gameh1.className = "gameH1Left"
    gameh1.style.color = games[i].titleColor
    gameDiv.appendChild(gameh1)

    let gameDescription = document.createElement("p")
    gameDescription.innerHTML = games[i].description
    gameDescription.className = "gameDescriptionLeft"
    gameDescription.style.color = games[i].descriptionColor
    gameDiv.appendChild(gameDescription)

    let gameButton = document.createElement("a")
    gameButton.innerHTML = "Play Game"
    gameButton.setAttribute("src", games[i].link)
    gameButton.style.backgroundColor = games[i].buttonColor
    gameButton.style.color = games[i].buttonTextColor
    gameButton.className = "gameButtonLeft"
    gameDiv.appendChild(gameButton)

}

let colorIndex = 0;
let colorsForTitle = ["#3df26d", "#f569f2", "#45f3ff"]

function changeColor() {
    if(colorIndex == 2){
        colorIndex = 0;
    }else{
        colorIndex++;
    }
}

console.log("hi")



setInterval(function() {
    let title = document.getElementById("titleH1")
    changeColor()
    title.style.color = colorsForTitle[colorIndex]
    console.log(colorIndex)
}, 1000)
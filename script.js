
const imgmet1 = document.getElementById("met1")
const imgmet2 = document.getElementById("met2")
const imgmet3 = document.getElementById("met3")
const imgmet4 = document.getElementById("met4")
const imgmet5 = document.getElementById("met5")
const imgmet6 = document.getElementById("met6")
const imgmet7 = document.getElementById("met7")

const imgcoin = document.getElementById("coin")



const canvas = document.querySelector("canvas")
const image = document.getElementById("skip")
canvas.width = 600
canvas.height = 700

let spiller_x = canvas.offsetWidth/2 - 37.5
let spiller_y = canvas.offsetHeight - 100

const ctx = canvas.getContext('2d')

let opp = false
let ned = false
let venstre = false
let hoyre = false

const scoreText = document.getElementById("score")
let score = 0



const met1 = {
    src: imgmet1,
    width: 60,
    height: 60,
    x: Math.random() * (canvas.width - 60),
    y: Math.random() * -canvas.offsetHeight
}

const met2 = {
    src: imgmet2,
    width: 70,
    height: 70,
    x: Math.random() * (canvas.width - 70),
    y: Math.random() * -canvas.offsetHeight
}

const met3 = {
    src: imgmet3,
    width: 80,
    height: 80,
    x: Math.random() * (canvas.width - 80),
    y: Math.random() * -canvas.offsetHeight
}

const met4 = {
    src: imgmet4,
    width: 85,
    height: 85,
    x: Math.random() * (canvas.width - 85),
    y: Math.random() * -canvas.offsetHeight
}

const met5 = {
    src: imgmet5,
    width: 90,
    height: 90,
    x: Math.random() * (canvas.width - 90),
    y: Math.random() * -canvas.offsetHeight
}   

const met6 = {
    src: imgmet6,
    width: 95,
    height: 95,
    x: Math.random() * (canvas.width - 95),
    y: Math.random() * -canvas.offsetHeight
}

const met7 = {
    src: imgmet7,
    width: 100,
    height: 100,
    x: Math.random() * (canvas.width - 100),
    y: Math.random() * -canvas.offsetHeight
}

const coin = {
    src: imgcoin,
    width: 100,
    height: 100,
    x: Math.random() * (canvas.width - 100),
    y: Math.random() * -canvas.offsetHeight
}


meteorer = [met1, met2, met3, met4, met5, met6, met7, coin]

function nyPos(){
    if (opp && spiller_y > 0) {
        spiller_y -= 8
    }
    if (ned && spiller_y < canvas.height - 75) {
        spiller_y += 8
    }
    if (venstre && spiller_x > 0) {
        spiller_x -= 8
    }
    if (hoyre && spiller_x < canvas.width - 75) {
        spiller_x += 8
    }


    for (met of meteorer) {
        let a = spiller_x + 37.5 - (met.x + met.width / 2)
        let b = spiller_y + 37.5 - (met.y + met.height / 2)
        let c = Math.sqrt(a**2 + b**2)


        if (c < 37.5 + met.width/2 - 15) {
            if (met == coin) {
                score++
                met.y = Math.random() * -canvas.height
                met.x = Math.random() * (canvas.width - met.width)

            } else {
                tapte()
            }
        }
    }
}

function tapte(){

    alert("Du døde og fikk " + score + " poeng")

    opp = false
    ned = false
    venstre = false
    hoyre = false

    score = 0
    spiller_x = canvas.offsetWidth / 2 - 37.5
    spiller_y = canvas.offsetHeight - 100
    for (met of meteorer) {
        met.y = Math.random() * -canvas.height
        met.x = Math.random() * (canvas.width - met.width)
    }
}

function tegnSkip(){
    nyPos()
    ctx.drawImage(image, spiller_x, spiller_y, 75, 75)
}

function tegnMet(met){
    ctx.drawImage(met.src, met.x, met.y, met.width, met.height)
}

function fallmet(met){
    met.y += 7
    if (met.y > canvas.height){
        met.y = Math.random() * -canvas.height/2
        met.x = Math.random() * (canvas.width - 100)
    }
}

function update() {
    clearCanvas()
    
    tegnSkip()
    
    for (met of meteorer){
        tegnMet(met)
        fallmet(met)
    }

    scoreText.innerText = score
    
    
    requestAnimationFrame(update)

}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
}

document.addEventListener("keydown", function(event){
    if(event.key == "d" || event.key == "D"){
        hoyre = true
    }
    if(event.key == "a" || event.key == "A"){
        venstre = true
    }

    if(event.key == "w" || event.key == "W"){
        opp = true
    }
    if(event.key == "s" || event.key == "S"){
        ned = true
    }

    
})

document.addEventListener("keyup", function(event){
    if(event.key == "d" || event.key == "D"){
        hoyre = false
    }
    if(event.key == "a" || event.key == "A"){
        venstre = false
    }

    if(event.key == "w" || event.key == "W"){
        opp = false
    }
    if(event.key == "s" || event.key == "S"){
        ned = false
    }
})




update()
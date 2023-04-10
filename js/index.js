const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d')
let gameOn = false
let obstacleArr = []

const boxmanImg = new Image()
boxmanImg.src = './images/boxman.png'

// rockImg = new Image()
// rockImg.src = './images/rock.png'

const bg1 = new Image()
const bg2 = new Image()
const bg3 = new Image()
const bg4 = new Image()
const bg5 = new Image()
bg1.src = './images/layer-1.png'
bg2.src = './images/layer-2.png'
bg3.src = './images/layer-3.png'
bg4.src = './images/layer-4.png'
bg5.src = './images/layer-5.png'

const rock1 = new Image()
const rock2 = new Image()
const rock3 = new Image()
const rock4 = new Image()
rock1.src = './images/rock1.png'
rock2.src = './images/rock2.png'
rock3.src = './images/rock3.png'
rock4.src = './images/rock4.png'


// function generateObastacles() {
//     let randomRock = Math.floor(Math.random() * (5 - 1) + 1)
//     let rock = `rock${randomRock}`
//     console.log(rock)
//     obstacleArr.push(new Obstacle(rock))
// }

function generateObastacles() {
    let randomRock = Math.floor(Math.random() * (5 - 1) + 1)
    let rock = `rock${randomRock}`

    let thisRock

    switch (rock) {
        case 'rock1':
            thisRock = rock1;
            break;
        case 'rock2':
            thisRock = rock2;
            break;
        case 'rock3':
            thisRock = rock3;
            break
        case 'rock4':
            thisRock = rock4;
            break;
    }
    console.log(rock)
    obstacleArr.push(new Obstacle(thisRock))
}

class Obstacle {
    constructor(rock) {
        this.rock = rock;
        this.x = canvas.width;
        this.y = canvas.height - 190;
        this.width = 70;
        this.height = 110;
    }

    update() {
        this.x -= 3.8
    }

    draw() {
        ctx.drawImage(this.rock, this.x, this.y, this.width, this.height)
    }
}


boxman = {
    x: 250,
    y: -120,
    width: 70,
    height: 120,
    maxHeight: 150,
    yVelocity: 0,
    gravity: .3,
    jumping: false,

    update() {
        //stops the character from going below the line
        if (this.y > canvas.height - 215) {
            this.y = canvas.height - 215
            this.yVelocity = 0
        }
        if (this.y < 70) {
            this.yVelocity += 10
        }


        this.y += this.yVelocity //creating gravity
        ctx.drawImage(boxmanImg, this.x, this.y, this.width, this.height)
    },

    newPosition(event) {
        if (event.code === 'ArrowUp') {
            this.yVelocity -= 20
        }
    }
}


function AnimationLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg1, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg2, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg3, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg4, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg5, 0, 0, canvas.width, canvas.height)
    // ctx.drawImage(rockImg, canvas.width - 90, canvas.height - 210, 80, 130)

    boxman.update()

    obstacleArr.forEach((i) => {
        i.update()
        i.draw()
    })

}


function startGame() {
    gameOn = true

    animationId = setInterval(AnimationLoop, 16)
    obstacleId = setInterval(generateObastacles, 2500)


    // ctx.drawImage(boxmanImg, 200, 400, 80, 120) this is working

}




window.onload = function () {
    document.getElementById('play-button').onclick = function () {
        if (!gameOn) {


            let logo = document.getElementById('logo-div')
            logo.style.display = 'none'

            let container = document.getElementById('game-board')
            container.style.visibility = 'visible'
            container.style.height = '600px'

            let gameBoard = document.getElementById('my-canvas')
            gameBoard.height = '600'
            gameBoard.width = '1200'

            document.addEventListener('keydown', (event) => {
                // console.log(event.key)
                boxman.newPosition(event)
            })

            startGame()

        }
    }
}
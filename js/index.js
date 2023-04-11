const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d')
let gameOn = false
let obstacleArr = []
let score = 0
let level = 1

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


function winGame() {
    console.log('won game')
    level = 1
    clearInterval(animationId)
    clearInterval(obstacleId)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = '150px Special Elite'
    ctx.fillStyle = 'red'
    ctx.fillText(`You Win`, 290, 330)

    obstacleArr = []
    boxman.x = 250
    boxman.y = -120
    boxman.yVelocity = 0
    gameOn = false
    console.log('game Over')
}

function LevelUp() {
    gameOn = false
    level++
    clearInterval(animationId)
    clearInterval(obstacleId)
    ctx.fillStyle = 'red'
    ctx.font = '150px Special Elite'
    ctx.fillText(`Level ${level}`, 250, 300)
    document.getElementById('play-button').onclick = function () {
        if (!gameOn) {
            startGame()
        }

    }
    //     requestAnimationFrame(AnimationLoop, generateObastacles)
}



function gameOver() {
    level = 1
    clearInterval(animationId)
    clearInterval(obstacleId)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = '150px Special Elite'
    ctx.fillStyle = 'red'
    ctx.fillText(`Game Over`, 200, 330)
    // ctx.fillText(`Score: ${score}`, 255, 400)

    obstacleArr = []
    boxman.x = 250
    boxman.y = -120
    boxman.yVelocity = 0
    gameOn = false
    console.log('game Over')
}

function collisionDetection(object) {
    if (boxman.x < object.x + object.width &&
        boxman.x + boxman.width > object.x &&
        boxman.y + boxman.height > object.y) {
        gameOver()
    }
}

function generateObastacles() {
    if (!gameOn) { return }
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
    obstacleArr.push(new Obstacle(thisRock))
}

class Obstacle {
    constructor(rock) {
        this.rock = rock;
        this.x = canvas.width;
        this.y = canvas.height - 160;
        this.width = 50;
        this.height = 80;
        this.randInt2 = Math.floor(Math.random() * (8 - 3) + 3)
        this.randInt3 = Math.floor(Math.random() * (8 - 5) + 5)
    }

    update() {
        if (level == 2) {
            this.x -= this.randInt2
        } else if (level == 3) {
            this.x -= this.randInt3
        } else {
            this.x -= 5
        }
    }

    draw() {
        ctx.drawImage(this.rock, this.x, this.y, this.width, this.height)
    }
}


boxman = {
    x: 250,
    y: -120,
    width: 60,
    height: 120,
    maxHeight: 150,
    yVelocity: 0,
    gravity: .1,
    jumping: false,

    update() {
        //stops the character from going below the line
        if (this.y > canvas.height - 215) {
            this.y = canvas.height - 215
            this.yVelocity = 0
        }
        if (this.y < 60) {
            this.yVelocity += 5
        }
        if (level == 2) {
            boxman.x = 450
        } else if (level == 3) {
            boxman.x = 650
        }


        this.y += this.yVelocity //creating gravity
        ctx.drawImage(boxmanImg, this.x, this.y, this.width, this.height)
    },

    newPosition(event) {
        if (event.code === 'ArrowUp') {
            this.yVelocity = 0
            this.yVelocity -= 25
        }
    }
}


function AnimationLoop() {
    console.log('animating')
    // if (!gameOn) { return }
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.reset()
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
        collisionDetection(i)
        if (i.x + i.width < 0) {
            score += 1
            // console.log(score)
            obstacleArr.splice(i, 1)
            if (score == 5 && level == 1) {
                LevelUp()
            } else if (score == 5 && level == 2) {
                LevelUp()
            } else if (score == 5 && level == 3) {
                winGame()
            }
        }
    })
    // ctx.fillStyle = 'black'
    // ctx.fillRect(20, 20, 120, 50)
    ctx.fillStyle = 'red'
    ctx.font = '36px Special Elite'
    ctx.fillText(`Score: ${score}`, 30, 52)
}


function startGame() {
    console.log('starting game')
    score = 0

    gameOn = true
    animationId = setInterval(AnimationLoop, 16)
    obstacleId = setInterval(generateObastacles, 2500)




    // ctx.drawImage(boxmanImg, 200, 400, 80, 120) this is working

}




window.onload = function () {
    document.getElementById('play-button').onclick = function () {
        if (!gameOn) {
            score = 0
            boxman.gravity = .1
            ctx.clearRect(0, 0, canvas.width, canvas.height)


            let logo = document.getElementById('logo-div')
            logo.style.display = 'none'

            let container = document.getElementById('game-board')
            container.style.visibility = 'visible'
            container.style.height = '600px'

            let gameBoard = document.getElementById('my-canvas')
            gameBoard.height = '600'
            gameBoard.width = '1200'

            document.addEventListener('keydown', (event) => {
                boxman.newPosition(event)
            })

            startGame()

        }
    }
}
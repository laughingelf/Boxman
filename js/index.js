const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d')
let gameOn = false
let obstacleArr = []
let score = 0
let level = 1
let jumping = false

const boxmanImg = new Image()
boxmanImg.src = './images/walkingSpritesheet.png'
const boxmanJumpImg = new Image()
boxmanJumpImg.src = './images/jump.png'


bg1 = new Image()
bg2 = new Image()
bg3 = new Image()
bg4 = new Image()
bg5 = new Image()
bg1.src = './images/layer-1.png'
bg2.src = './images/layer-2.png'
bg3.src = './images/layer-3.png'
bg4.src = './images/layer-4.png'
bg5.src = './images/layer-5.png'
backgroundLayers = [this.bg1, this.bg2, this.bg3, this.bg4, this.bg5]

const pinkMonster = new Image()
const robotBall = new Image()
const furrMonster = new Image()
const greenMonster = new Image()
const alienMonster = new Image()
pinkMonster.src = './images/pinkMonster.png'
robotBall.src = './images/robotBall.png'
furrMonster.src = './images/furrMonster.png'
greenMonster.src = './images/greenMonster.png'
alienMonster.src = './images/alienMonster.png'

function drawBackground() {
    backgroundLayers.forEach((layer) => {
        ctx.drawImage(layer, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(layer, 0, 0 + canvas.width, canvas.width, canvas.height)
    })
}

function winGame() {
    console.log('won game')
    level = 1
    clearInterval(animationId)
    clearInterval(obstacleId)

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

    ctx.font = '150px Special Elite'
    ctx.fillStyle = 'red'
    ctx.fillText(`Game Over`, 200, 330)

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
    let randomEnemy = Math.floor(Math.random() * (6 - 1) + 1)
    let enemy = `enemy${randomEnemy}`

    let thisEnemy

    switch (enemy) {
        case 'enemy1':
            thisEnemy = pinkMonster;
            break;
        case 'enemy2':
            thisEnemy = robotBall;
            break;
        case 'enemy3':
            thisEnemy = furrMonster;
            break;
        case 'enemy4':
            thisEnemy = greenMonster;
            break;
        case 'enemy5':
            thisEnemy = alienMonster;
            break;
    }
    obstacleArr.push(new Obstacle(thisEnemy))
}

class Obstacle {
    constructor(enemy) {
        this.enemy = enemy;
        this.x = canvas.width;
        this.y = canvas.height - 170;
        this.width = 50;
        this.height = 80;
        this.randInt2 = Math.floor(Math.random() * (8 - 3) + 3)
        this.randInt3 = Math.floor(Math.random() * (8 - 5) + 5)
        this.pinkHeight = 610;
        this.pinkWidth = 674
        this.robotHeight = 522;
        this.robotWidth = 409;
        this.furrMonsterHeight = 534
        this.furrMonsterWidth = 654
        this.greenMonsterHeight = 508
        this.greenMonsterWidth = 451
        this.alienMonsterHeight = 787
        this.alienMonsterWidth = 1214
        this.frameX = 0
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
        if (this.enemy === pinkMonster) {
            ctx.drawImage(pinkMonster, this.frameX * this.pinkWidth, 0, this.pinkWidth, this.pinkHeight, this.x, this.y, this.width, this.height)
            if (this.frameX < 16) {
                this.frameX++
            } else {
                this.frameX = 0
            }
        } else if (this.enemy === robotBall) {
            ctx.drawImage(robotBall, this.frameX * this.robotWidth, 0, this.robotWidth, this.robotHeight, this.x, this.y, this.width, this.height)
            if (this.frameX < 15) {
                this.frameX++
            } else {
                this.frameX = 0
            }
        } else if (this.enemy === furrMonster) {
            ctx.drawImage(furrMonster, this.frameX * this.furrMonsterWidth, 0, this.furrMonsterWidth, this.furrMonsterHeight, this.x, this.y, this.width, this.height)
            if (this.frameX < 12) {
                this.frameX++
            } else {
                this.frameX = 0
            }
        } else if (this.enemy === greenMonster) {
            ctx.drawImage(greenMonster, this.frameX * this.greenMonsterWidth, 0, this.greenMonsterWidth, this.greenMonsterHeight, this.x, this.y, this.width, this.height)
            if (this.frameX < 12) {
                this.frameX++
            } else {
                this.frameX = 0
            }
        } else if (this.enemy === alienMonster) {
            ctx.drawImage(alienMonster, this.frameX * this.alienMonsterWidth, 0, this.alienMonsterWidth, this.alienMonsterHeight, this.x, this.y, this.width, this.height)
            if (this.frameX < 12) {
                this.frameX++
            } else {
                this.frameX = 0
            }
        }
    }
}


boxman = {
    x: 250,
    y: -120,
    width: 60,
    height: 120,
    yVelocity: 0,
    gravity: .1,
    jumping: false,
    spriteHeight: 170,
    spriteWidth: 107,
    jumpSpriteHeight: 169,
    jumpSpriteWidth: 92,
    frameX: 0,
    speed: 0,
    maxspeed: 0,


    update() {

        //stops the character from going below the line
        if (this.y > canvas.height - 215) {
            this.y = canvas.height - 215
            this.yVelocity = 0
            jumping = false
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
        if (jumping) {
            ctx.drawImage(boxmanJumpImg, this.frameX * this.jumpSpriteWidth, 0, this.jumpSpriteWidth, this.jumpSpriteHeight, this.x, this.y, this.width, this.height)
            if (this.frameX < 12) {
                this.frameX++
            } else {
                this.frameX = 0
            }
        } else {
            ctx.drawImage(boxmanImg, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
            if (this.frameX < 20) {
                this.frameX++
            } else {
                this.frameX = 0
            }
        }
    },

    newPosition(event) {
        if (event.code === 'ArrowUp') {
            jumping = true
            this.yVelocity = 0
            this.yVelocity -= 25
        }
    }
}


function AnimationLoop() {

    ctx.reset()
    drawBackground()
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
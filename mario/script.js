const canvas = document.querySelector("canvas");
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const winScreen = document.getElementById('winScreen');
const finalScore = document.getElementById('finalScore');
const finalScore1 = document.getElementById('finalScore1');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
//2d---> to create 2d game 
const c = canvas.getContext('2d');

//To make the canvas fill the screen in width and height
canvas.width = 1724;
canvas.height = 730;

const gravity = 1.5;

//score 
let Target = 0;


function start() {
    startScreen.style.display = 'none';

    init();
    animate();
}

function restart() {
    gameOverScreen.style.display = 'none';
    winScreen.style.display = 'none';

    init();
    animate();
    gameOverSound.pause();
};

function gameOver() {
    cancelAnimationFrame(animationGame);
    gameOverScreen.style.display = 'flex';
    finalScore.textContent = score;
}

class Player {
    constructor() {
        this.position =
        {
            x: 100,
            y: 100
        }
        this.velocity =
        {
            x: 0,
            y: 1
        }
        this.width = 70
        this.height = 146
        this.image = createImage(spriteStandRightPath);
        this.frames = 0
        this.isJumping = false;

        this.sprites =
        {
            stand: {
                right: createImage(spriteStandRightPath),
                left: createImage(spriteStandLeftPath),
                cropWidth: 177,
                width: 70
            }
            ,
            run: {
                right: createImage(spriteRunRightPath),
                left: createImage(spriteRunLeftPath),
                cropWidth: 341,
                width: 120

            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }
    draw() {
        c.drawImage(this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height)

    }


    update() {
        this.frames++
        if (this.frames > 58 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
            this.frames = 0
        }
        else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
            this.frames = 0
        }

        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }

        else {
            this.velocity.y = 0;
            this.isJumping = false;


        }
    }
    jump() {
        if (!this.isJumping) {
            this.velocity.y = -25;
            this.isJumping = true;
        }
    }

}

class Coin {
    constructor(x, y, image) {

        this.width = 40
        this.height = 40
        this.position = { x, y };

    }

    draw() {
        if (this.image) {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
        else {

            c.fillStyle = 'gold';
            c.beginPath();
            c.arc(this.position.x, this.position.y, this.width / 2, 0, Math.PI * 2);
            c.fill();
        }
    }

}

const coinImagePath = 'img/Screenshot from 2025-01-31 19-44-54.png';
const coinImage = createImage(coinImagePath);

let size = 200;

let score = 0;  // Track the score

function checkCoinCollision() {
    coins.forEach((coin, index) => {
        if (
            player.position.x < coin.position.x + coin.width &&
            player.position.x + player.width > coin.position.x &&
            player.position.y < coin.position.y + coin.height &&
            player.position.y + player.height > coin.position.y
        ) {
            coins.splice(index, 1);
            coinSound.play()
            score += 10;  // Add score for collecting a coin
        }
    });
}

const platformPath = 'img/lgPlatform.08b2286.png';
const backGroundPath = 'img/background.072d51b.png'
const hillPath = 'img/hills.png'
const hillSmallPath = 'img/platformSmallTall.png'
const spriteRunRightPath = 'img/spriteRunRight.png'
const spriteRunLeftPath = 'img/spriteRunLeft.png'
const spriteStandRightPath = 'img/spriteStandRight.png'
const spriteStandLeftPath = 'img/spriteStandLeft.png'

const startSound = new Audio('audios/gamestart-272829.mp3');
const jumpSound = new Audio('audios/smb_jump-small.wav');
const coinSound = new Audio('audios/smb_coin.wav');
const gameOverSound = new Audio('audios/smb_gameover.wav');


function createImage(imgSrc) {
    const image = new Image();
    image.src = imgSrc
    return image;
}
class Platform {
    constructor(x, y, image) {
        this.position =
        {
            x,
            y
        }
        this.image = platformImage
        this.height = image.height
        this.width = image.width

    }
    draw() {
        if (this.image) {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
        else {
            c.fillStyle = 'red'
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}

class PlatformHill {
    constructor(x, y, image) {
        this.position =
        {
            x,
            y
        }
        this.image = hillSmallImage
        this.height = image.height
        this.width = image.width

    }
    draw() {
        if (this.image) {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
        else {
            c.fillStyle = 'red'
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}


class genericObject {
    constructor(x, y, image) {
        this.position =
        {
            x,
            y
        }
        this.image = image

        this.height = image.height
        this.width = image.width

    }
    draw() {
        if (this.image) {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
        else {
            c.fillStyle = 'red'
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}

let player = new Player();
const backGroundImage = createImage(backGroundPath);
const hillImage = createImage(hillPath);
let hillSmallImage = createImage(hillSmallPath)
let platformImage = createImage(platformPath);

let Platforms = [];
let PlatformHills = [];
let genericObjects = []
let Players = []
let coins = [];


let lastKey

const keys =
{
    right:
    {
        pressed: false
    },
    left:
    {
        pressed: false
    }
}

function init() {
    player = new Player();

    startSound.play();
    score = 0
    winScreen.style.display = 'none';

    platformImage = createImage(platformPath);

    Platforms = [
        new Platform(-70, 633, platformImage),
        new Platform(platformImage.width * 1 + 100, 633, platformImage),
        new Platform(platformImage.width * 2 + 300, 633, platformImage),
        new Platform(platformImage.width * 3 + 700, 633, platformImage),
        new Platform(platformImage.width * 4 + 100, 633, platformImage),
        new Platform(platformImage.width * 5 + 300, 633, platformImage),
        new Platform(platformImage.width * 6 + 700, 633, platformImage),
        new Platform(platformImage.width * 7 + 100, 633, platformImage),
        new Platform(platformImage.width * 8 + 300, 633, platformImage),
        new Platform(platformImage.width * 9 + 700, 633, platformImage),
        new Platform(platformImage.width * 10 + 100, 633, platformImage),
        new Platform(platformImage.width * 11 + 300, 633, platformImage),
        new Platform(platformImage.width * 12 + 700, 633, platformImage),
        new Platform(platformImage.width * 13 + 100, 633, platformImage),
        new Platform(platformImage.width * 14 + 300, 633, platformImage),
        new Platform(platformImage.width * 15 + 700, 633, platformImage),
        new Platform(platformImage.width * 16 + 100, 633, platformImage),
        new Platform(platformImage.width * 17 + 300, 633, platformImage),
        new Platform(platformImage.width * 18 + 700, 633, platformImage),
        new Platform(platformImage.width * 19 + 100, 633, platformImage),
        new Platform(platformImage.width * 20 + 300, 633, platformImage),
        new Platform(platformImage.width * 21 + 700, 633, platformImage),
        new Platform(platformImage.width * 22 + 100, 633, platformImage),
        new Platform(platformImage.width * 23 + 300, 633, platformImage),
        new Platform(platformImage.width * 24 + 700, 633, platformImage),
        new Platform(platformImage.width * 25 + 100, 633, platformImage),
        new Platform(platformImage.width * 26 + 300, 633, platformImage),
        new Platform(platformImage.width * 27 + 700, 633, platformImage),
        new Platform(platformImage.width * 28 + 100, 633, platformImage),
        new Platform(platformImage.width * 29 + 300, 633, platformImage),
        new Platform(platformImage.width * 30 + 700, 633, platformImage),

    ];


    PlatformHills = []

    for (var i = 1; i < 100; i++) {
        PlatformHills.push(
            new PlatformHill((platformImage.width * 3 * 2 * i) + 10, 430, hillSmallImage),
            new PlatformHill((platformImage.width * 6 * 2 * i) + 10, 430, hillSmallImage),
            new PlatformHill((platformImage.width * 7.4 * 2 * i) + 10, 430, hillSmallImage),
            new PlatformHill((platformImage.width * 7.5 * 2 * i) + 10, 205, hillSmallImage))
    }


    genericObjects = [
        new genericObject(-1, -1, backGroundImage),
        new genericObject(-1, 148, hillImage),
    ]

    coins = [];

    for (var i = 0; i < 100; i++) {

        if (i % 3 == 0) {
            coins.push(new Coin(1100 + size * i, 500, coinImage));
        }

    }

    for (var i = 0; i < 50; i++) {

        coins.push(new Coin(2000 + size * 6 * i, 250 + i * 10, coinImage));

    }
}

function animate() {
    animationGame = requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach(genericObjects => {
        genericObjects.draw()
    })

    player.update();
    coins.forEach(coin => coin.draw());
    checkCoinCollision();


    // Display score
    c.fillStyle = 'black';
    c.font = '30px Arial';
    c.fillText('Score: ' + score, 20, 50);

    PlatformHills.forEach((platformHill) => {
        platformHill.draw();
    })

    Platforms.forEach((platform) => {
        platform.draw();
    })

    if (keys.right.pressed && player.position.x < 900) {
        player.velocity.x = 10
    }
    else
        if ((keys.left.pressed && player.position.x > 0) || keys.left.pressed && Target === 0 && player.position.x > 0) {
            player.velocity.x = -10

        }

        else {
            player.velocity.x = 0
            if (keys.right.pressed) {
                if (player.position.x >= 100) {
                }
                Platforms.forEach((platform) => {
                    platform.position.x -= 10
                    Target += 5
                })
                genericObjects.forEach((genericObject) => {
                    genericObject.position.x -= 2
                })
                PlatformHills.forEach((platformHill) => {
                    platformHill.position.x -= 10;
                })
                coins.forEach((coin) => {
                    coin.position.x -= 10
                })

            }
            else if (keys.left.pressed && Target > 0) {
                Platforms.forEach((platform) => {
                    platform.position.x += 10
                    Target -= 5

                })
                genericObjects.forEach((genericObject) => {
                    genericObject.position.x += 2
                })
                PlatformHills.forEach((platformHill) => {
                    platformHill.position.x += 10;
                })
                coins.forEach((coin) => {
                    coin.position.x += 10
                })

            }

        }



    Platforms.forEach((platform) => {

        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y
            &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width

        ) {
            player.velocity.y = 0;
            player.isJumping = false;

        }


    })

    if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    PlatformHills.forEach((platformHill) => {

        if (
            player.position.y + player.height <= platformHill.position.y &&
            player.position.y + player.height + player.velocity.y >= platformHill.position.y &&
            player.position.x + player.width >= platformHill.position.x &&
            player.position.x <= platformHill.position.x + platformHill.width

        ) {
            player.velocity.y = 0;
            player.isJumping = false;

        }
    })

    if (score == 450) {


        winScreen.style.display = 'block';
        finalScore1.textContent = score;

    }

    if (player.position.y + player.height >= canvas.height) {
        gameOver();
        gameOverSound.play();
    }
}

platformImage.onerror = () => console.error('Error loading platform image');

player.draw();
addEventListener('keydown', function ({ keyCode }) {
    switch (keyCode) {
        case 38:
            console.log("up");
            player.jump();
            jumpSound.play()
            break;
        case 40:
            console.log("down");

            break;
        case 39:
            console.log("right");
            keys.right.pressed = true;
            lastKey = 'right'

            break;
        case 37:
            console.log("left");
            keys.left.pressed = true;
            lastKey = 'left'

            break;
    }

})
addEventListener('keyup', function ({ keyCode }) {
    switch (keyCode) {
        case 40:
            console.log("down");

            break;
        case 39:
            console.log("right");
            keys.right.pressed = false;
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break;
        case 37:
            console.log("left");
            keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break;
    }

})

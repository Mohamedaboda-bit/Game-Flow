var canves = document.querySelector("canvas");
var context = canves.getContext('2d')
canves.width = 1024;
canves.height = 576;

context.fillRect(0, 0, canves.width, canves.height);

var background_sound = new Audio('./sounds/background.wav')

var backGround = new sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: "./imgs/background.png"
})
// backGround.img.onload =()=>{
//     context.drawImage(backGround.img,0,0,document.body.offsetWidth,document.body.offsetHeight);
//     console.log(backGround.img.width)
// }
var shop = new sprite({
    position: {
        x: canves.width * 0.6,
        y: canves.height * 0.22
    },
    imgSrc: "./imgs/shop.png",
    scale: 2.75,
    maxFrames: 6,
})

var gravity = canves.height * 0.0005;
// creating object from players and passing the starting positions
var player = new fighter({
    position: {
        x: canves.width * 0.1,
        y: canves.height * 0.175
    },
    speed: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        y: 0,
        x: 0
    },
    imgSrc: "./imgs/Martial Hero/Sprites/Idle.png",
    maxFrames: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imgSrc: "./imgs/Martial Hero/Sprites/Idle.png",
            maxFrames: 8,
        },
        running: {
            imgSrc: "./imgs/Martial Hero/Sprites/Run.png",
            maxFrames: 8,
        },
        Jump: {
            imgSrc: "./imgs/Martial Hero/Sprites/Jump.png",
            maxFrames: 2,
        },
        Fall: {
            imgSrc: "./imgs/Martial Hero/Sprites/Fall.png",
            maxFrames: 2,
        },
        Attack1: {
            imgSrc: "./imgs/Martial Hero/Sprites/Attack2.png",
            maxFrames: 6,
        },
        takeHit: {
            imgSrc: "./imgs/Martial Hero/Sprites/Take Hit - white silhouette.png",
            maxFrames: 4,
        },
        Death: {
            imgSrc: "./imgs/Martial Hero/Sprites/Death.png",
            maxFrames: 6,
        },

    },
    hitBox: {
        offset: {
            x: canves.width * 0.08,
            y: canves.height * 0.05
        },
        width: canves.width * 0.15,
        height: canves.height * 0.1
    },
    sounds :{
        slash :"./sounds/player1/player1_slash.wav"
    }
})

var player2 = new fighter({
    position: {
        x: canves.width * 0.8,
        y: canves.height * 0.175
    },
    speed: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: {
        y: 0,
        x: -50
    },
    imgSrc: "./imgs/Martial Hero 2/Sprites/Idle.png",
    maxFrames: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imgSrc: "./imgs/Martial Hero 2/Sprites/Idle.png",
            maxFrames: 4,
        },
        running: {
            imgSrc: "./imgs/Martial Hero 2/Sprites/Run.png",
            maxFrames: 8,
        },
        Jump: {
            imgSrc: "./imgs/Martial Hero 2/Sprites/Jump.png",
            maxFrames: 2,
        },
        Fall: {
            imgSrc: "./imgs/Martial Hero 2/Sprites/Fall.png",
            maxFrames: 2,
        },
        Attack1: {
            imgSrc: "./imgs/Martial Hero 2/Sprites/Attack1.png",
            maxFrames: 4,
        },
        takeHit: {
            imgSrc: "./imgs/Martial Hero 2/Sprites/Take hit.png",
            maxFrames: 3,
        },
        Death: {
            imgSrc: "./imgs/Martial Hero 2/Sprites/Death.png",
            maxFrames: 7,
        }
    },
    hitBox: {
        offset: {
            x: - (canves.width * 0.05) * 3,
            y: canves.height * 0.05
        },
        width: canves.width * 0.15,
        height: canves.height * 0.1
    },
    sounds :{
        slash :"./sounds/player2/player2_slash.wav"
    }
})


var keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    },
    v: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
}


function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = "black";
    context.fillRect(0, 0, canves.width, canves.height);
    backGround.update();
    shop.update(); 
    // context.fillStyle = 'rgba(255,255,255,0.07)'
    // context.fillRect(0, 0, canves.width, canves.height)
    player.update();
    player2.update();

    // players infnite movement inhibitors
    player.speed.x = 0;
    player2.speed.x = 0;

    // players movement overlaping inhibitors
    // player 1

    if (keys.a.pressed && player.lastKey === 'a' && player.position.x > 0) {
        player.speed.x = -canves.width * 0.005; 
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x < canves.width - player.width -15)  {
        player.speed.x = canves.width * 0.005;
        player.switchSprite('run');
    } else if (keys.v.pressed && player.lastKey === 'v') {
        player.attack();
    }
    // check if player in air or not to allow jump
    else if (keys.w.pressed && player.inAir === false) {
        player.speed.y = -9;
    }
    else {
        player.switchSprite('idle');
    }
    // jumping
    if (player.speed.y < 0) {
        player.switchSprite('jump');
    }
    else if (player.speed.y > 0) {
        player.switchSprite('Fall');
    }


    // player 2
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft' && player2.position.x >= 0) {
        player2.speed.x = -canves.width * 0.005;;
        player2.switchSprite('run');
    }
    else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight' && player2.position.x < canves.width - player2.width - 15) {
        player2.speed.x = canves.width * 0.005;;
        player2.switchSprite('run');
    } else if (keys.ArrowDown.pressed && player2.lastKey === 'ArrowDown') {
        player2.attack();
    }

    // checking for in air jump
    else if (keys.ArrowUp.pressed && player2.inAir === false) {
        player2.speed.y = -9;
    }
    else {
        player2.switchSprite('idle');
    }
    // jumping
    if (player2.speed.y < 0) {
        player2.switchSprite('jump');
    }
    else if (player2.speed.y > 0) {
        player2.switchSprite('Fall');
    }

    //check of collision and enemy gets a hit
    // player 1
    if (
        checkForcollision({
            hero: player,
            Enemy: player2
        }) &&
        player.isAttacking && player.currFrame === 4
    ) {
        player2.takeHit(1.5);
        player.isAttacking = false;
        gsap.to('#enemyHealth', {
            width: player2.health + "%"
        })
    }
    // if player one missess 
    if (player.isAttacking && player.currFrame === 4) {
        player.isAttacking = false;
    }

    //check of collision 
    // player 2
    if (
        checkForcollision({
            hero: player2,
            Enemy: player
        }) &&
        player2.isAttacking && player2.currFrame === 2
    ) {
        player.takeHit(1);
        player2.isAttacking = false;
        gsap.to('#playerHealth', {
            width: player.health + "%"
        })
    }
    // if player 2 one missess 
    if (player2.isAttacking && player2.currFrame === 2) {
        player2.isAttacking = false;
    }


    // determine winner
    if (player.health <= 0 || player2.health <= 0) {
        determineWinner({ player, player2, timerId });
    }
}

var start = document.querySelector('#start')
var game = document.querySelector('#container')
var message = document.querySelector('#message')
var body = document.querySelector('body')

start.addEventListener('click',()=>{
    body.style.backgroundImage = 'none';
    game.style.display = 'inline-block';
    message.remove();
    background_sound.volume = 0.3
    background_sound.loop = true;
    background_sound.play();
    animate();
    decreseTimer();
})


// players movements
window.addEventListener('keydown', (event) => {
    //player 1
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                keys.w.pressed = true;
                break;
            case 'v':
                keys.v.pressed = true;
                player.lastKey = 'v';
                break;
        }
    }

    //player 2
    if (!player2.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                player2.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                player2.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                keys.ArrowUp.pressed = true;
                break;
            case 'ArrowDown':
                keys.ArrowDown.pressed = true;
                player2.lastKey = 'ArrowDown';
                break;
        }
    }
})
// players movement stoppers
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //player 1
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 'v':
            keys.v.pressed = false;
            break;
        // player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;

    }
})

var canves = document.querySelector("canvas");
var context = canves.getContext('2d')

canves.width = 1024;
canves.height = 576;

context.fillRect(0, 0, canves.width, canves.height);


var backGround = new sprite({
    position:{
        x:0,
        y:0
    },
    imgSrc:"./imgs/background.png"
})

var shop = new sprite({
    position:{
        x:600,
        y:128
    },
    imgSrc:"./imgs/shop.png",
    scale:2.75,
    maxFrames :6,
})

var gravity = 0.2
// creating object from players and passing the starting positions
var player = new fighter({
    position: {
        x: 0,
        y: 0
    },
    speed: {
        x: 0,
        y: 10
    },
    color: 'blue',
    offset: {
        y: 0,
        x: 0
    },
    imgSrc:"./imgs/Martial Hero/Sprites/Idle.png",
    maxFrames :8,
    scale:2.5,
    offset :{
        x :215,
        y: 157
    }
})

var player2 = new fighter({
    position: {
        x: 500,
        y: 50
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
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

decreseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = "black";
    context.fillRect(0, 0, canves.width, canves.height);
    backGround.update();
    shop.update();
    player.update();
   // player2.update();

    // players infnite movement inhibitors
    player.speed.x = 0;
    player2.speed.x = 0;

    // players movement overlaping inhibitors
    // player 1
    if (keys.a.pressed && player.lastKey === 'a') {
        player.speed.x = -2;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.speed.x = 2;
    }
    else if (keys.w.pressed && player.inAir === false) {
        player.speed.y = -9;
    }

    // player 1
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.speed.x = -2;
    }
    else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.speed.x = 2;
    }
    else if (keys.ArrowUp.pressed && player2.inAir === false) {
        player2.speed.y = -9;
    }

    //check of collision 
    // player 1
    if (
        checkForcollision({
            hero: player,
            Enemy: player2
        }) &&
        player.isAttacking
    ) {
        player2.health -= 5;
        player.isAttacking = false;
        document.querySelector("#enemyHealth").style.width= player2.health + "%"
    }
 
    // player 2
    if (
        checkForcollision({
            hero: player2,
            Enemy: player
        }) &&
        player2.isAttacking
    ) {
        player.health -= 5;
        player2.isAttacking = false;
        document.querySelector("#playerHealth").style.width= player.health + "%"
    }

    // determine winner
    if(player.health<=0 || player2.health <=0){
        determineWinner({player,player2,timerId});
    } 
}

animate();


// players movements
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        //player 1
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
        case ' ':
            player.attack();
            break;
        //player 2
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
            player2.attack();
            break;

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

    }
})

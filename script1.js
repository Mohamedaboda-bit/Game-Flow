



const canvas = document.querySelector("canvas");
//2d---> to create 2d game 
const c = canvas.getContext('2d');
//To make the canvas fill the screen in width and height
canvas.width = 1924;
canvas.height = 730;

const gravity = 1.5;

//score 
let Target = 0;
//create class Player to use object from that the class
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

        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

   


    update() {
        this.frames++
        if (this.frames > 58 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
            this.frames = 0
        }
        else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right|| this.currentSprite === this.sprites.run.left)) {
            this.frames = 0
        }

        // if (this.frames > 58 && this.currentSprite === this.sprites.stand.left) {
        //     this.frames = 0
        // }
        // else if (this.frames > 29 && this.currentSprite === this.sprites.run.left) {
        //     this.frames = 0
        // }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else
            this.velocity.y = 0;
    }
}
//     class Player2 {
//         constructor(x,y) {
//             this.position =
//             {
//                 x,
//                 y
//             }
//             this.velocity =
//             {
//                 x: 0,
//                 y: 1
//             }
//             this.width = 70
//             this.height = 146
//             // this.image = createImage(spriteStandRightPath);
//             // this.frames = 0
//             // this.sprites =
//             // {
//             //     stand: {
//             //         right: createImage(spriteStandRightPath),
//             //         left: createImage(spriteStandLeftPath),
//             //         cropWidth: 177,
//             //         width: 70
//             //     }
//             //     ,
//             //     run: {
//             //         right: createImage(spriteRunRightPath),
//             //         left: createImage(spriteRunLeftPath),
//             //         cropWidth: 341,
//             //         width: 120
    
//             //     }
//             // }
//             // this.currentSprite = this.sprites.stand.right
//             // this.currentCropWidth = 177
//         }
//         draw() {

            
//         c.fillStyle = 'blue'
//         c.fillRect(this.position.x, this.position.y, this.width, this.height)
//             // c.drawImage(this.currentSprite,
//             //     this.currentCropWidth * this.frames,
//             //     0,
//             //     this.currentCropWidth,
//             //     400,
//             //     this.position.x,
//             //     this.position.y,
//             //     this.width,
//             //     this.height)
    
//             // c.fillStyle = 'blue'
//             // c.fillRect(this.position.x, this.position.y, this.width, this.height)
//  }
//  update() {
//     this.frames++
//     if (this.frames > 58 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
//         this.frames = 0
//     }
//     else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right|| this.currentSprite === this.sprites.run.left)) {
//         this.frames = 0
//     }

//     // if (this.frames > 58 && this.currentSprite === this.sprites.stand.left) {
//     //     this.frames = 0
//     // }
//     // else if (this.frames > 29 && this.currentSprite === this.sprites.run.left) {
//     //     this.frames = 0
//     // }
//     this.draw();
//     this.position.y += this.velocity.y;
//     this.position.x += this.velocity.x;
//     if (this.position.y + this.height + this.velocity.y <= canvas.height)
//         this.velocity.y += gravity;
//     else
//         this.velocity.y = 0;
// }
// }

class Player2 {
    constructor(x, y) {
        this.position = {
            x,
            y
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 70
        this.height = 146
    }
    
    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.frames++
        if (this.frames > 58 && this.currentSprite === this.sprites.stand.right) {
            this.frames = 0
        }
        else if (this.frames > 29 && this.currentSprite === this.sprites.run.right) {
            this.frames = 0
        }

        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity; // تطبيق الجاذبية
        } else {
            this.velocity.y = 0; // إيقاف الحركة عند الوقوف على المنصة
        }

        // التحقق من التصادم مع المنصات:
        Platforms.forEach((platform) => {
            if (
                this.position.y + this.height <= platform.position.y &&
                this.position.y + this.height + this.velocity.y >= platform.position.y &&
                this.position.x + this.width >= platform.position.x &&
                this.position.x <= platform.position.x + platform.width
            ) {
                this.velocity.y = 0; // إيقاف الحركة العمودية عند التصادم مع المنصة
            }
        });
    }
}

const platformPath = 'img/lgPlatform.08b2286.png'; // Correct path to the image
const backGroundPath = 'img/background.072d51b.png'
const hillPath = 'img/hills.png'
const hillSmallPath = 'img/platformSmallTall.png'

const spriteRunRightPath = 'img/spriteRunRight.png'
const spriteRunLeftPath = 'img/spriteRunLeft.png'
const spriteStandRightPath = 'img/spriteStandRight.png'
const spriteStandLeftPath = 'img/spriteStandLeft.png'


// create function to create Image by pass the path of image 
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
        // this.height=120
        // this.width=800 
        this.height = image.height
        this.width = image.width
        // alert("ss")

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
        // this.height=120
        // this.width=800 
        this.height = image.height
        this.width = image.width
        // alert("ss")

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

// Enemy Class (moves opposite of player)
class Enemy {
    constructor(x, y, width, height, speed) {
        this.position = { x, y };
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw() {
        c.fillStyle = 'green';  // Color for the enemy (you can replace it with an image)
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(playerVelocity) {
        // Move opposite to the player by reversing their velocity (could add more complex logic if needed)
        this.position.x -= playerVelocity.x * this.speed;
        this.position.y -= playerVelocity.y * this.speed;
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
        // this.height=120
        // this.width=800
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

const backGroundImage = createImage(backGroundPath);
const hillImage = createImage(hillPath);
let hillSmallImage = createImage(hillSmallPath)
let player = new Player();
let player2= new Player2();
//////////////////////////////

let platformImage = createImage(platformPath);
const enemy = new Enemy  (800, 300, 150, 150, 0.5)

// const platformImage = createImage(platformPath);
// const platformImage = createImage(platformPath);
let Platforms = [];
let PlatformHills = [];
let genericObjects = []
let Players =[]
// let Enemys = [] 

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
    // player2 = new Player2(1700,200);
    platformImage = createImage(platformPath);

    // const platformImage = createImage(platformPath);
    // const platformImage = createImage(platformPath);
    Platforms = [
        new Platform(-70, 633, platformImage),
        new Platform(platformImage.width * 1 + 100, 633, platformImage),
        new Platform(platformImage.width * 2 + 300, 633, platformImage),
        new Platform(platformImage.width * 3 + 700, 633, platformImage),
        new Platform(platformImage.width * 4 + 100, 633, platformImage),
        new Platform(platformImage.width * 5 + 300, 633, platformImage),
        new Platform(platformImage.width * 6 + 700, 633, platformImage),

        // new Platform((platformImage.width) *2.2-1,633, platformImage),
        // new Platform((platformImage.width*3)*3.3-1,633, platformImage),
        // new Platform((platformImage.width*3),110, createImage(hillSmallPath))


    ];
    PlatformHills = [
        new PlatformHill((platformImage.width * 3) + 10, 430, hillSmallImage),
        new PlatformHill((platformImage.width * 6) + 10, 430, hillSmallImage),
        new PlatformHill((platformImage.width * 7.4) + 10, 430, hillSmallImage),
        new PlatformHill((platformImage.width * 7.5) + 10, 210, hillSmallImage)
    ]
    // Enemys = [
    //     new Enemy (500, 300, 150, 150, 0.5),
    //     new Enemy (800, 300, 150, 150, 0.5)
    Players = [
        
        new Player2(2000,200),
        new Player2(1700,200)
    ]

    // ]
    genericObjects = [
        new genericObject(-1, -1, backGroundImage),
        new genericObject(-1, 148, hillImage),
        // new genericObject(1800, 448, hillSmallImage),

    ]
    // new Platform(platformImage.width *1 +100 , 633, platformImage),


    Target = 0;
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);
    // Enemys.forEach(Enemy => {
    //     Enemy.draw()
    // })
    
    // enemy.draw()
    genericObjects.forEach(genericObjects => {
        genericObjects.draw()
    })
    player.update();    
    Players.forEach((player2 =>
    {
        player2.draw()
        player2.update()
    }
    ))
    // player2.update();
    // player.draw()
    PlatformHills.forEach((platformHill) => {
        platformHill.draw();
    })
    Platforms.forEach((platform) => {
        platform.draw();
    })
    enemy.draw()



    // platform.draw()

    //player.position.x<600 =====> to disable player move out the page 
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
                    player2.velocity.x = -10
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

            }

        }

       
    // console.log(Scroll)

    Platforms.forEach((platform) => {

        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y
             &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width 
            // player2.position.y + player2.height <= PlatformHill.position.y &&
            // player2.position.y + player2.height + player2.velocity.y >= PlatformHill.position.y
            //  &&
            // player2.position.x + player2.width >= PlatformHill.position.x &&
            // player2.position.x <= PlatformHill.position.x + PlatformHill.width 
        ) {
            player.velocity.y = 0;
        }

        // if (
        //     // player.position.y + player.height <= platform.position.y &&
        //     // player.position.y + player.height + player.velocity.y >= platform.position.y
        //     //  &&
        //     // player.position.x + player.width >= platform.position.x &&
        //     // player.position.x <= platform.position.x + platform.width 
        //     player2.position.y + player2.height <= PlatformHill.position.y ||
        //     player2.position.y + player2.height + player2.velocity.y >= PlatformHill.position.y||
        //     player2.position.x + player2.width >= PlatformHill.position.x ||
        //     player2.position.x <= PlatformHill.position.x + PlatformHill.width 
        // ) {
        //     player2.velocity.y = 0;
        // }
    })

    if(keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right)
    {
        player.frames = 1
        player.currentSprite = player.sprites.run.right 
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if(keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left)
    {
        player.currentSprite = player.sprites.run.left 
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if(!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left)
    {
        player.currentSprite = player.sprites.stand.left 
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    else if(!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right)
    {
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
            // player.position.y + player.height <= PlatformHill.position.y &&
            // player.position.y + player.height + player.velocity.y >= PlatformHill.position.y &&
            // player.position.x + player.width >= PlatformHill.position.x &&
            // player.position.x <= PlatformHill.position.x + PlatformHill.width 
        ) {
            player.velocity.y = 0;
        }
    })
    // if(player.position.y + player.height <=platform.position.y
    //  &&player.position.y + player.height + player.velocity.y >= platform.position.y)
    // {
    //     player.velocity.y = 0;
    // }
    if (Target > 2000) {
        console.log("You Win")
    }

    if(player.position.y>=580)
    {
        init()
        // console.log("you lose")
    }
    // if(player2.position.y >= 500 )
    // {
    //     player2.width =0
    // }

    // if(player2.position.x == player.position.x )
    // {
    //     init()
    // }

}

init()
animate()
platformImage.onerror = () => console.error('Error loading platform image');

player.draw();
addEventListener('keydown', function ({ keyCode }) {
    switch (keyCode) {
        case 38:
            console.log("up");
            player.velocity.y -= 15
            break;
        case 40:
            console.log("down");

            break;
        case 39:
            console.log("right");
            keys.right.pressed = true;
            lastKey = 'right'
            // player.currentSprite = player.sprites.run.right
            // player.currentCropWidth = player.sprites.run.cropWidth
            // player.width = player.sprites.run.width
            break;
        case 37:
            console.log("left");
            keys.left.pressed = true;
            lastKey = 'left'
            // player.currentSprite = player.sprites.run.left
            // player.currentCropWidth = player.sprites.run.cropWidth
            // player.width = player.sprites.run.width
            break;
    }

})
addEventListener('keyup', function ({ keyCode }) {
    switch (keyCode) {
        case 38:
            console.log("up");
            player.velocity.y -= 15
            break;
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
console.log(c);
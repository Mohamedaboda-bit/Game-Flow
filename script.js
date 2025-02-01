<<<<<<< HEAD
window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

function toggleMenu(){
  const toggleMenu = document.querySelector('.toggleMenu');
  const nav = document.querySelector('.nav');
  toggleMenu.classList.toggle('active');
  nav.classList.toggle('active');
}

window.addEventListener('scroll',function(){
  var anime = document.querySelector('.animex');

  for(var s =0;s<anime.length; s++){
    var windowheight= window.innerHeight;
    var animetop = anime[s].getBoundingClientRect().top;
    var animepoint=150; 
    if(animetop < windowheight - animepoint ){
      anime[s].classList.add('active');
    }
    else{
      anime[s].classList.remove('active');
    }
  }
})


let list = document.querySelectorAll('.list');
let card = document.querySelectorAll('.card');

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener('click', function() {
      list.forEach(item => item.classList.remove('active'));

      this.classList.add('active');

      let dataFilter = this.getAttribute('data-filter');
      console.log("Filter selected:", dataFilter); 
      if (dataFilter === 'pc') {
          let count = 0;
          card.forEach(c => {
              let itemType = c.getAttribute('data-item');
              console.log("Checking card with type:", itemType);
              if (itemType === 'pc') {
                  if (count < 4) {
                      c.classList.remove('hide');
                      c.classList.add('active');
                      count++;
                  } else {
                      c.classList.add('hide');
                  }
              } else {
                  c.classList.add('hide');
              }
          });
      } 
      else if (dataFilter === 'mobile') {
          card.forEach(c => {
              let itemType = c.getAttribute('data-item');

              if (itemType === 'mobile' && c.classList.contains('hide')) {
                  c.classList.remove('hide');
                  c.classList.add('active');
              } else if (itemType !== 'mobile') {
                  c.classList.add('hide');
              }
          });
      }
  });
}



=======




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
        this.width = 40
        this.height = 40
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }


    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else
            this.velocity.y = 0;
    }
}
const platformPath = 'img/lgPlatform.08b2286.png'; // Correct path to the image
const backGroundPath = 'img/background.072d51b.png'
const hillPath = 'img/hills.png'
const hillSmallPath = 'img/hill.png'


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
const hillSmallImage = createImage(hillSmallPath)
let player = new Player();
let platformImage = createImage(platformPath);

// const platformImage = createImage(platformPath);
// const platformImage = createImage(platformPath);
let Platforms = [];
let genericObjects = []

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
    platformImage = createImage(platformPath);

    // const platformImage = createImage(platformPath);
    // const platformImage = createImage(platformPath);
    Platforms = [
        new Platform(-1, 633, platformImage),
        new Platform((platformImage.width) *1.1 - 1, 633, platformImage),
        new Platform((platformImage.width) *2.2-1,633, platformImage),
        new Platform((platformImage.width*3)*3.3-1,633, platformImage),
        // new Platform((hillSmallImage.width*3)*3.3-1,200, hillSmallImage)


    ];
    genericObjects = [
        new genericObject(-1, -1, backGroundImage),
        new genericObject(-1, 148, hillImage),
        // new genericObject(1800, 448, hillSmallImage),

    ]

    
    Target = 0; 
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach(genericObjects => {
        genericObjects.draw()
    })

    Platforms.forEach((platform) => {
        platform.draw();
    })
    player.update();
    // platform.draw()

    //player.position.x<600 =====> to disable player move out the page 
    if (keys.right.pressed && player.position.x < 900) {
        player.velocity.x = 10
    }
    else
        if (keys.left.pressed && player.position.x > 0) {
            player.velocity.x = -10

        }
        else {
            player.velocity.x = 0
            if (keys.right.pressed) {
                Platforms.forEach((platform) => {
                    platform.position.x -= 10
                    Target += 5
                })
                genericObjects.forEach((genericObject) => {
                    genericObject.position.x -= 2
                })
            }
            else if (keys.left.pressed) {
                Platforms.forEach((platform) => {
                    platform.position.x += 10
                    Target -= 5

                })
                genericObjects.forEach((genericObject) => {
                    genericObject.position.x += 2
                })

            }

        }
    // console.log(Scroll)

    Platforms.forEach((platform) => {



        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
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

    if(player.position.y>=690)
    {
        init()
        // console.log("you lose")
    }
}

init()
animate()
platformImage.onerror = () => console.error('Error loading platform image');

player.draw();
addEventListener('keydown', function ({ keyCode }) {
    switch (keyCode) {
        case 38:
            console.log("up");
            player.velocity.y -= 10
            break;
        case 40:
            console.log("down");

            break;
        case 39:
            console.log("right");
            keys.right.pressed = true;
            break;
        case 37:
            console.log("left");
            keys.left.pressed = true;
            break;
    }

})
addEventListener('keyup', function ({ keyCode }) {
    switch (keyCode) {
        case 38:
            console.log("up");
            player.velocity.y -= 10
            break;
        case 40:
            console.log("down");

            break;
        case 39:
            console.log("right");
            keys.right.pressed = false;
            break;
        case 37:
            console.log("left");
            keys.left.pressed = false;
            break;
    }

})
console.log(c);
>>>>>>> e6528153147029310b42cffb8e8d4d57bbe153ea

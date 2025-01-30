class sprite {
    constructor({ position,imgSrc,scale =1, maxFrames =1, offset = { x:0 , y:0 }}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.img = new Image();
        this.img.src = imgSrc;
        this.scale = scale,
        this.maxFrames = maxFrames,
        this.currFrame = 0,
        this.frameElapsed = 0;
        this.frameHold = 6,
        this.offset = offset
    }

    draw() {
        context.drawImage(
            this.img,
            this.currFrame * (this.img.width / this.maxFrames),
            0,
            (this.img.width / this.maxFrames) - 1,
            this.img.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.img.width / this.maxFrames )*this.scale,
            this.img.height * this.scale)
    }

    animateFrames(){
        this.frameElapsed ++;
        if(this.frameElapsed % this.frameHold === 0){
        if(this.currFrame < this.maxFrames -1 ){
            this.currFrame ++;
        } else{
            this.currFrame =0;
        }
      }
    }

    update() {
        this.draw();
        this.animateFrames();
    }


}

class fighter extends sprite{
    constructor({ position, speed, color,imgSrc,scale =1, maxFrames =1, offset = { x:0 , y:0 }})
         {
        super({
            position, 
            imgSrc,
            scale,
            maxFrames,
            offset
        })
        this.speed = speed;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.inAir;
        this.hitBox = {
            position: {
                y: this.position.y,
                x: this.position.x
            },
            height: 50,
            width: 100,
            offset,
        },
        this.color = color;
        this.isAttacking;
        this.health=100,  
        this.currFrame = 0,
        this.frameElapsed = 0;
        this.frameHold = 6
    }

   

    update() {
        // making the players fall down from thier starting postions
        this.draw();
        this.animateFrames();

        this.position.y += this.speed.y
        this.position.x += this.speed.x
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
        this.hitBox.position.y = this.position.y;


        // stopping the player from falling beyond the screen bottom edge and adding acceleration gravity from smoth fall
        if (this.position.y + this.height + this.speed.y >= canves.height-96) {
            this.speed.y = 0;
        } else {
            this.speed.y += gravity
        }

        // this if condtion contributes on stopping the players from jumping in the air
        if (this.position.y + this.height + this.speed.y < canves.height-96) {
            this.inAir = true
        }
        else {
            this.inAir = false
        }

    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }
}

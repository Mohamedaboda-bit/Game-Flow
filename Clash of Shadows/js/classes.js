class sprite {
    constructor({ position, imgSrc, scale = 1, maxFrames = 1, offset = { x: 0, y: 0 } }) {
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
            (this.img.width / this.maxFrames) * this.scale,
            this.img.height * this.scale)
    }

    animateFrames() {
        this.frameElapsed++;
        if (this.frameElapsed % this.frameHold === 0) {
            if (this.currFrame < this.maxFrames - 1) {
                this.currFrame++;
            } else {
                this.currFrame = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }


}

class fighter extends sprite {
    constructor({
        position,
        speed,
        color,
        imgSrc,
        scale = 1,
        maxFrames = 1,
        offset = { x: 0, y: 0 },
        sprites,
        hitBox = { offset: {}, width: undefined, height: undefined },
        sounds }) 
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
            height: hitBox.height,
            width: hitBox.width,
            offset: hitBox.offset
        },
            this.color = color;
        this.isAttacking;
        this.health = 100,
            this.currFrame = 0,
            this.frameElapsed = 0,
            this.frameHold = 6,
            this.sprites = sprites,
            this.dead = false,
            this.sounds = sounds
            this.attackSound = new Audio(this.sounds.slash)
            this.attackSound.volume = 0.1,
            this.deathSound = new Audio("./sounds/death.wav")

        for (var sprite in this.sprites) {
            sprites[sprite].img = new Image();
            sprites[sprite].img.src = sprites[sprite].imgSrc;
        }
    }



    update() {
        // making the players fall down from thier starting postions
        this.draw();
        if (!this.dead) this.animateFrames();

        // attack bot
        //context.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)


        this.position.y += this.speed.y
        this.position.x += this.speed.x
        //attack box
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
        this.hitBox.position.y = this.position.y + this.hitBox.offset.y;


        // stopping the player from falling beyond the screen bottom edge and adding acceleration gravity from smoth fall
        if (this.position.y + this.height + this.speed.y >= canves.height - 96) {
            this.speed.y = 0;
            this.position.y = 330
        } else {
            this.speed.y += gravity
        }

        // this if condtion contributes on stopping the players from jumping in the air
        if (this.position.y + this.height + this.speed.y < canves.height - 96) {
            this.inAir = true
        }
        else {
            this.inAir = false
        }

    }

    attack() {
        if(this.attackSound.paused || this.attackSound.ended){
            this.attackSound.play();
        }
        this.switchSprite('Attack1')
        this.isAttacking = true;
    }

    takeHit(dmg) {
        if (this.health <= 0) {
            this.switchSprite("Death");
        } else {
            this.switchSprite("takeHit")
        }
        this.health -=dmg;
    }

    switchSprite(sprite) {
        // overridibg all other animations with Death animation 
        if (this.img === this.sprites.Death.img) {
            if (this.currFrame === this.sprites.Death.maxFrames - 1)
                this.dead = true;
                return
        }

        // overridibg all other animations with attack animation 
        if (this.img === this.sprites.Attack1.img &&
            this.currFrame < this.sprites.Attack1.maxFrames - 1
        )
            return

        // overridibg all other animations with takeHit animation 
        if (this.img === this.sprites.takeHit.img &&
            this.currFrame < this.sprites.takeHit.maxFrames - 1
        )
            return

        switch (sprite) {
            case 'idle':
                if (this.img !== this.sprites.idle.img) {
                    this.img = this.sprites.idle.img
                    this.maxFrames = this.sprites.idle.maxFrames
                    this.currFrame = 0;
                }
                break;
            case 'run':
                if (this.img !== this.sprites.running.img) {
                    this.img = this.sprites.running.img
                    this.maxFrames = this.sprites.running.maxFrames
                    this.currFrame = 0;
                }
                break;
            case 'jump':
                if (this.img !== this.sprites.Jump.img) {
                    this.img = this.sprites.Jump.img;
                    this.maxFrames = this.sprites.Jump.maxFrames
                    this.currFrame = 0;
                }
                break;
            case 'Fall':
                if (this.img !== this.sprites.Fall.img) {
                    this.img = this.sprites.Fall.img;
                    this.maxFrames = this.sprites.Fall.maxFrames
                    this.currFrame = 0;
                }
                break;
            case 'Attack1':
                if (this.img !== this.sprites.Attack1.img) {
                    this.img = this.sprites.Attack1.img;
                    this.maxFrames = this.sprites.Attack1.maxFrames
                    this.currFrame = 0;
                }
                break;
            case 'takeHit':
                if (this.img !== this.sprites.takeHit.img) {
                    this.img = this.sprites.takeHit.img;
                    this.maxFrames = this.sprites.takeHit.maxFrames
                    this.currFrame = 0;
                }
                break;
            case 'Death':
                this.deathSound.play();
                if (this.img !== this.sprites.Death.img) {
                    this.img = this.sprites.Death.img;
                    this.maxFrames = this.sprites.Death.maxFrames
                    this.currFrame = 0;
                }
                break;
            default:
                break;
        }
    }

}

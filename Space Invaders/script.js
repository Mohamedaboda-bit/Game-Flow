class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
        this.lives = 3;
        this.image =document.getElementById('player');
        this.framex=0;
    }
    draw(context) {
        //  context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image,this.width *3,0,this.width,
            this.height,this.x,this.y,this.width,this.height);
    }
    update() {
        if (this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if (this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;

        if (this.x < -this.width / 2) this.x = -this.width / 2;
        else if (this.x > this.game.width - this.width / 2) this.x = this.game.width - this.width / 2;
    }
    shoot() {
        const Projectile = this.game.getprojectile();
        if (Projectile) Projectile.start(this.x, this.y);
    }
    restart() {
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;

    }


}
class Projectile {

    constructor() {
        this.width = 5;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;


    }
    draw(context) {
        if (!this.free) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update() {
        if (!this.free) {
            this.y -= this.speed;
            if (this.y + this.height < 0) {
                this.reset();
            }
        }
    }

    start(x, y) {
        this.x = x + 50 - this.width / 2;
        this.y = y;
        this.free = false;
    }

    reset() {
        this.free = true;
    }
}

class Enemy {
    constructor(game, positionx, positiony) {
        this.game = game;
        this.width = this.game.EnemySize;
        this.height = this.game.EnemySize;
        this.x = 0;
        this.y = 0;
        this.positionx = positionx;
        this.positiony = positiony;
        this.markedForDeletion = false;
        this.image = null; 
        this.framex = 0;
        this.framey = 0;
        this.maxFrame = 1; 
        this.lives = 1; 
        this.maxlives = this.lives;

    }
    draw(context) {
        context.drawImage(this.image, this.framex * this.width,
            this.framey * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
    update(x, y) {
        this.x = x + this.positionx;
        this.y = y + this.positiony;

        this.game.Projectilespool.forEach(Projectile => {
            if (!Projectile.free && this.game.checkCollision(this, Projectile)) {
                this.hit(1);
                Projectile.reset();
            }
        });
        if (this.lives < 1) {
            this.framex++;
            if (this.framex > this.maxFrame) {
                this.markedForDeletion = true;
                if (!this.game.gameOver) this.game.score += this.maxlives;

            }
        }
        if (this.game.checkCollision(this, this.game.Player)) {
            this.markedForDeletion = true;
            if (!this.game.gameOver && this.score > 0) this.game.score--;
            this.game.Player.lives--;
            if (this.game.Player.lives < 1) this.game.gameOver = true;
        }

        if (this.y + this.height > this.game.height) {
            this.game.gameOver = true;
            this.markedForDeletion = true;
        }


    }
    hit(damage) {
        this.lives -= damage;
        if(this.lives < 1){
        this.markedForDeletion = true;
        this.game.score++;
        }
    }

}
class Beet extends Enemy {
    constructor(game, positionx, positiony) {
        super(game, positionx, positiony);
        this.image = document.getElementById('beetlemorph');
        this.framex = 0;
        this.framey = Math.floor(Math.random() * 4);
        this.lives = 1;
        this.maxlives = this.lives;
    }
}
class Wave {
    constructor(game) {
        this.game = game;
        this.width = this.game.columns * this.game.EnemySize;
        this.height = this.game.rows * this.game.EnemySize;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedx = Math.random() < 0.5 ? -1 : 1;
        this.speedy = 0;
        this.enemies = [];
        this.nexetWaveTrigger = false;
        this.create();
    }
    render(context) {

        if (this.y < 0) this.y += 6;
        this.speedy = 0;
        if (this.x < 0 || this.x > this.game.width - this.width) {
            this.speedx *= -1;
            this.speedy = this.game.EnemySize;
        }
        this.x += this.speedx;
        this.y += this.speedy;
        this.enemies.forEach(Enemy => {
            Enemy.update(this.x, this.y);
            Enemy.draw(context);
        })
        this.enemies = this.enemies.filter(Object => !Object.markedForDeletion);
    }
    create() {
        for (let y = 0; y < this.game.rows; y++) {
            for (let x = 0; x < this.game.columns; x++) {
                let EnemyY = y * this.game.EnemySize;
                let EnemyX = x * this.game.EnemySize;
                this.enemies.push(new Beet(this.game, EnemyX, EnemyY));
            }
        }
    }
}
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.Player = new Player(this);

        this.Projectilespool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();
        this.fired = false;

        this.columns = 5;
        this.rows = 2;
        this.EnemySize = 80;

        this.Waves = [];
        this.Waves.push(new Wave(this));
        this.WaveCount = 1;
        this.gameOver = false;
        this.score = 0;
        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);

            if (e.key === ' ' && !this.fired) this.Player.shoot();
            this.fired = true;
            if (e.key === 'r' && this.gameOver) this.restart();

        });
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
            this.fired = false;
        });

    }
    render(context, deltaTime) {

        console.log(deltaTime);

        this.drawStatusText(context)
        this.Player.draw(context);
        this.Player.update();
        this.Projectilespool.forEach(Projectile => {
            Projectile.update();
            Projectile.draw(context);
        })
        this.Waves.forEach(Wave => {
            Wave.render(context);
            if (Wave.enemies.length < 1 && !Wave.nexetwaveTrigger && !this.gameOver) {
                this.newWave();
                this.WaveCount++;
                Wave.nexetwaveTrigger = true;
            }

        })
    }

    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.Projectilespool.push(new Projectile());
        }
    }
    getprojectile() {
        for (let i = 0; i < this.Projectilespool.length; i++) {
            if (this.Projectilespool[i].free) return this.Projectilespool[i]
        }
    }
    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y


        )
    }
    drawStatusText(context) {
        context.save();
        context.shadowOffsetx = 5;
        context.shadowOffsety = 5;
        context.shadowColor = 'black';
        context.fillText('Score: ' + this.score, 20, 40);
        context.fillText('Wave: ' + this.WaveCount, 20, 80);

        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '100px Impact';
            context.fillText('GAME OVER!', this.width * 0.5, this.height * 0.5);
            context.font = '20PX Impact';
            context.fillText('Press R to restart!', this.width * 0.5, this.height * 0.5 +30);

        }
        context.restore();
    }
    newWave() {
        if (Math.random() < 0.5 && this.colums * this.EnemySize < this.width * 0.8)
            this.columns++;
        else if (this.rows * this.EnemySize < this.width * 0.6)
            this.rows++;
        this.Waves.push(new Wave(this));
    }
    restart() {

        this.Player.restart();
        this.columns = 2;
        this.rows = 2;
        this.Waves = [];
        this.Waves.push(new Wave(this));
        this.WaveCount = 1;
        this.gameOver = false;
        this.score = 0;
        this.Projectilespool.forEach(projectile => projectile.reset());
    }
}

window.addEventListener('load', function () {
    const canvas = this.document.getElementById('canvas1');
    const cts = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 700;
    cts.fillStyle = 'white';
    cts.strokeStyle = 'white';
    cts.lineWidth = 5;
    cts.font = '30px Impact';
    const game = new Game(canvas);
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        cts.clearRect(0, 0, canvas.width, canvas.height);
        game.render(cts, deltaTime);
        requestAnimationFrame(animate);

    }
    animate(0);
});
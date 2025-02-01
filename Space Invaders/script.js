class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
        this.lives = 3;
        this.image = document.getElementById('player');
        this.framex = 0;
    }

    draw(context) {
        context.drawImage(this.image, this.width * 3, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.game.keys.includes('ArrowLeft')) this.x -= this.speed;
        if (this.game.keys.includes('ArrowRight')) this.x += this.speed;

        this.x = Math.max(-this.width / 2, Math.min(this.x, this.game.width - this.width / 2));
    }

    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile) projectile.start(this.x + this.width / 2 - projectile.width / 2, this.y);
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
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update() {
        if (!this.free) {
            this.y -= this.speed;
            if (this.y + this.height < 0) this.reset();
        }
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.free = false;
    }

    reset() {
        this.free = true;
    }
}

class Enemy {
    constructor(game, positionX, positionY) {
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
        this.image = document.getElementById('beetlemorph');
        this.framex = 0;
        this.framey = Math.floor(Math.random() * 4);
        this.lives = 1;
        this.maxLives = this.lives;
    }

    draw(context) {
        context.drawImage(this.image, this.framex * this.width, this.framey * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(x, y) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;

        this.game.projectiles.forEach(projectile => {
            if (!projectile.free && this.game.checkCollision(this, projectile)) {
                this.hit(1);
                projectile.reset();
            }
        });

        if (this.lives < 1) {
            this.framex++;
            if (this.framex > 1) this.markedForDeletion = true;
        }

        if (this.game.checkCollision(this, this.game.player)) {
            this.markedForDeletion = true;
            this.game.player.lives--;
            if (this.game.player.lives < 1) this.game.gameOver = true;
        }

        if (this.y + this.height > this.game.height) {
            this.game.gameOver = true;
            this.markedForDeletion = true;
        }
    }

    hit(damage) {
        this.lives -= damage;
        if (this.lives < 1) {
            this.markedForDeletion = true;
            this.game.score++;
        }
    }
}

class Wave {
    constructor(game) {
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedX = Math.random() < 0.5 ? -1 : 1;
        this.speedY = 0;
        this.enemies = [];
        this.nextWaveTrigger = false;
        this.create();
    }

    render(context) {
        if (this.y < 0) this.y += 6;
        this.speedY = 0;
        if (this.x < 0 || this.x > this.game.width - this.width) {
            this.speedX *= -1;
            this.speedY = this.game.enemySize;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.enemies.forEach(enemy => {
            enemy.update(this.x, this.y);
            enemy.draw(context);
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    create() {
        for (let y = 0; y < this.game.rows; y++) {
            for (let x = 0; x < this.game.columns; x++) {
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                this.enemies.push(new Enemy(this.game, enemyX, enemyY));
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
        this.player = new Player(this);

        this.projectiles = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();
        this.fired = false;

        this.columns = 5;
        this.rows = 2;
        this.enemySize = 80;

        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.gameOver = false;
        this.score = 0;

        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.key === ' ' && !this.fired) this.player.shoot();
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
        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        this.projectiles.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
        this.waves.forEach(wave => {
            wave.render(context);
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
                this.newWave();
                this.waveCount++;
                wave.nextWaveTrigger = true;
            }
        });
    }

    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectiles.push(new Projectile());
        }
    }

    getProjectile() {
        return this.projectiles.find(projectile => projectile.free);
    }

    checkCollision(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }

    drawStatusText(context) {
        context.save();
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.shadowColor = 'black';
        context.fillText('Score: ' + this.score, 20, 40);
        context.fillText('Wave: ' + this.waveCount, 20, 80);

        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '100px Impact';
            context.fillText('GAME OVER!', this.width * 0.5, this.height * 0.5);
            context.font = '20px Impact';
            context.fillText('Press R to restart!', this.width * 0.5, this.height * 0.5 + 30);
        }
        context.restore();
    }

    newWave() {
        if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0.8) {
            this.columns++;
        } else if (this.rows * this.enemySize < this.width * 0.6) {
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }

    restart() {
        this.player.restart();
        this.columns = 2;
        this.rows = 2;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.gameOver = false;
        this.score = 0;
        this.projectiles.forEach(projectile => projectile.reset());
    }
}

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 700;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.font = '30px Impact';
    const game = new Game(canvas);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        requestAnimationFrame(animate);
    }

    animate(0);
});
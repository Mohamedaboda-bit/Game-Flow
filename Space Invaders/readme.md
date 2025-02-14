# 2D Space Shooter Game

## Overview
This is a **2D space shooter game** where the player controls a spaceship to shoot down waves of enemies. The game features:
- A player-controlled spaceship that can move left and right and shoot projectiles.
- Waves of enemies that move in a pattern and can be destroyed by the player's projectiles.
- A scoring system that increases as enemies are destroyed.
- A **game-over** state when the player loses all lives or enemies reach the bottom of the screen.
- The ability to restart the game after a game-over.

The game is built using **HTML5 Canvas and JavaScript**.

---

## How to Run the Game

### Prerequisites:
- A modern web browser (e.g., Chrome, Firefox, Edge).
- A code editor (e.g., VS Code) to view and modify the code.

### Setup:
1. Create an `index.html` file and include the game code in a `<script>` tag or link to an external JavaScript file.
2. Ensure the required images (e.g., `player.png`, `beetlemorph.png`) are available and correctly referenced in the code.

### Run the Game:
1. Open the `index.html` file in a web browser.
2. Use the **Arrow Keys** to move the player left and right.
3. Press the **Spacebar** to shoot projectiles.
4. Press **R** to restart the game after a game-over.

---

## Key Features

### 1. Player Movement
- The player can move left and right using the **arrow keys**.
- The player's position is constrained to the **canvas boundaries**.

### 2. Shooting
- The player can shoot **projectiles** by pressing the **spacebar**.
- Projectiles are reused from a **pool** to optimize performance.

### 3. Enemy Waves
- Enemies are organized into **waves** that move in a pattern.
- Each wave increases in **difficulty** by adding more enemies.

### 4. Collision Detection
- **Bounding box collision** detects when projectiles hit enemies.
- Collisions between enemies and the player reduce the **player's lives**.

### 5. Game Over
- The game ends when the player loses all **lives** or enemies reach the bottom of the screen.
- The player can restart the game by pressing **R**.

---

## Game Structure
The game is organized into several **classes**, each responsible for a specific part of the game logic. Below is a breakdown of the classes and their functionality.

### 1. Player Class
Represents the player-controlled spaceship.

#### Properties:
- `game`: Reference to the main game object.
- `width`, `height`: Dimensions of the player sprite.
- `x`, `y`: Position of the player on the canvas.
- `speed`: Movement speed of the player.
- `lives`: Number of lives the player has.
- `image`: The sprite image for the player.
- `framex`: Current animation frame.

#### Methods:
- `draw(context)`: Draws the player on the canvas.
- `update()`: Updates the player's position based on keyboard input.
- `shoot()`: Fires a projectile from the player's position.
- `restart()`: Resets the player's position and lives.

### 2. Projectile Class
Represents the projectiles fired by the player.

#### Properties:
- `width`, `height`: Dimensions of the projectile.
- `x`, `y`: Position of the projectile.
- `speed`: Movement speed of the projectile.
- `free`: Indicates whether the projectile is available for reuse.

#### Methods:
- `draw(context)`: Draws the projectile on the canvas.
- `update()`: Updates the projectile's position and resets it if it goes off-screen.
- `start(x, y)`: Activates the projectile at the specified position.
- `reset()`: Resets the projectile to an inactive state.

### 3. Enemy Class
Represents enemies in the game.

#### Properties:
- `game`: Reference to the main game object.
- `width`, `height`: Dimensions of the enemy sprite.
- `x`, `y`: Position of the enemy on the canvas.
- `positionX`, `positionY`: Relative position within the wave.
- `markedForDeletion`: Indicates if the enemy should be removed.
- `image`: The sprite image for the enemy.
- `framex`, `framey`: Animation frames.
- `lives`: Number of lives the enemy has.
- `maxLives`: Maximum lives the enemy can have.

#### Methods:
- `draw(context)`: Draws the enemy on the canvas.
- `update(x, y)`: Updates the enemy's position and checks for collisions.
- `hit(damage)`: Reduces enemy lives and marks it for deletion if lives reach zero.

### 4. Wave Class
Represents a wave of enemies.

#### Properties:
- `game`: Reference to the main game object.
- `width`, `height`: Dimensions of the wave.
- `x`, `y`: Position of the wave.
- `speedX`, `speedY`: Movement speed.
- `enemies`: Array of enemies in the wave.
- `nextWaveTrigger`: Indicates if the next wave should start.

#### Methods:
- `render(context)`: Renders the wave and updates enemy positions.
- `create()`: Creates a grid of enemies.

### 5. Game Class
The main controller for the game.

#### Properties:
- `canvas`: The HTML5 canvas element.
- `width`, `height`: Dimensions of the canvas.
- `keys`: Array of currently pressed keys.
- `player`: The player object.
- `projectiles`: Array of projectiles.
- `columns`, `rows`: Number of columns and rows for enemy waves.
- `enemySize`: Size of each enemy.
- `waves`: Array of waves.
- `waveCount`: Current wave number.
- `gameOver`: Indicates whether the game is over.
- `score`: Current score.

#### Methods:
- `render(context, deltaTime)`: Renders the game and updates all objects.
- `createProjectiles()`: Initializes the pool of projectiles.
- `getProjectile()`: Returns an available projectile from the pool.
- `checkCollision(a, b)`: Checks for collisions between two objects.
- `drawStatusText(context)`: Draws score, wave count, and game-over message.
- `newWave()`: Creates a new wave of enemies.
- `restart()`: Resets the game.

---

## How to Play
1. Open `index.html` in a browser.
2. Click the **Start** button to begin.
3. Use the **Arrow Keys** to move.
4. Press **Spacebar** to shoot.
5. Press **R** to restart the game.

Enjoy your space adventure! 🚀

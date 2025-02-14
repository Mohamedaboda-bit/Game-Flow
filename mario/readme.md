# Mario-Style Game

## Game Overview
This game is a **2D platformer** where the player controls a character (similar to Mario) that can jump, run, and collect coins while avoiding obstacles and platforms. The game includes a score system that rewards the player for collecting coins. The game ends when the player falls off the screen, displaying a **Game Over** screen. If the player reaches a certain score, a **Win** screen appears.

---

## Game Features

### Player Movement
- Move left and right using the **arrow keys**.
- Jump using the **up arrow key**.
- The player is affected by **gravity** and falls if they are not on a platform.

### Platforms
- Static platforms are placed across the screen, which the player can jump on.
- Hills are also placed as **decorative elements**.

### Coins
- Collectable **coins** are scattered throughout the level.
- The player earns **10 points** for each coin collected.

### Game States
- **Start Screen**: Displays a start button to begin the game.
- **Game Over Screen**: Appears when the player falls off the screen.
- **Win Screen**: Appears when the player collects enough coins to win the game.

### Score System
- The player gains **10 points** per collected coin.
- The score is displayed at the **top-left corner** of the screen.
- The game ends when the player falls off the screen, and the **final score** is shown.

---

## Game Components

### Player Class
Defines the player's character and behavior.

#### Properties:
- `position`: Player's position on the canvas *(x, y)*.
- `velocity`: Movement velocity *(x, y)*.
- `width`: Width of the player character.
- `height`: Height of the player character.
- `image`: The sprite image of the player.
- `frames`: The current frame of animation.
- `isJumping`: Boolean indicating if the player is in the air.
- `sprites`: Object containing images for different actions (standing, running).

#### Methods:
- `draw()`: Draws the player sprite at its position.
- `update()`: Updates movement, applies gravity, and handles jumping.
- `jump()`: Makes the player jump if they are not already jumping.

### Coin Class
Represents collectible coins in the game.

#### Properties:
- `position`: Coin's position on the canvas *(x, y)*.
- `width`: Coin's width.
- `height`: Coin's height.
- `image`: Image of the coin.

#### Methods:
- `draw()`: Draws the coin on the canvas.

### Platform Class
Represents static platforms.

#### Properties:
- `position`: Platform's position *(x, y)*.
- `width`: Width of the platform.
- `height`: Height of the platform.
- `image`: Image used for the platform.

#### Methods:
- `draw()`: Draws the platform on the canvas.

### PlatformHill Class
Represents hills in the game that the player can jump on.

#### Properties:
- `position`: Hill's position *(x, y)*.
- `width`: Width of the hill.
- `height`: Height of the hill.
- `image`: Image used for the hill.

#### Methods:
- `draw()`: Draws the hill on the canvas.

### GenericObject Class
Used for non-interactive objects like the background or scenery.

#### Properties:
- `position`: Object's position *(x, y)*.
- `image`: Image used for the object.

#### Methods:
- `draw()`: Draws the object on the canvas.

---

## Game Logic

### Starting the Game
- Clicking the **Start** button begins the game and hides the start screen.
- The `start()` function initializes game objects and starts the game loop.

### Movement
- The player can move left or right using the **arrow keys**.
- The `update()` method applies gravity, jumping, and movement.
- The `jump()` method allows the player to jump.

### Coin Collection
- The `checkCoinCollision()` function checks if the player **collides** with a coin.
- If a collision occurs, the coin is removed, and the **score increases** by 10.

### Platforms
- The player's position is checked against platforms.
- If the player **lands** on a platform, their downward velocity is set to `0`.

### Game Over
- If the player falls off the screen, the **Game Over** screen appears.
- The `gameOver()` function is called, and the **gameOverSound** is played.

---

## Controls
- **Arrow Up (↑):** Jump
- **Arrow Left (←):** Move left
- **Arrow Right (→):** Move right

---

## Audio
The game includes the following **sound effects**:
- `startSound`: Played when the game starts.
- `jumpSound`: Played when the player jumps.
- `coinSound`: Played when the player collects a coin.
- `gameOverSound`: Played when the game ends.

---

## File Structure

### **HTML Files**
- `index.html`: Main HTML file containing the canvas and game controls.

### **Image Files**
- `background.png`: Background image.
- `platform.png`: Platform image.
- `coin.png`: Collectible coin image.
- `player.png`: Player sprite images (standing, running).

### **Sound Files**
- `gamestart-272829.mp3`: Sound played when the game starts.
- `smb_jump-small.wav`: Sound played when the player jumps.
- `smb_coin.wav`: Sound played when the player collects a coin.
- `smb_gameover.wav`: Sound played when the game ends.

---

## How to Play
1. Open `index.html` in a browser.
2. Click the **Start** button to begin.
3. Use the arrow keys to **move** and **jump**.
4. Collect **coins** to earn points.
5. Avoid falling off the screen!
6. Reach the required score to **win** the game.

Enjoy the game! 🎮

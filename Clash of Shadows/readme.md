# Clash of Shadows

## Game Overview
**Clash of Shadows** is a **two-player pixel-art classic fighting game**. The player whose **health bar** drops to **0** first **loses**.

---

## How to Play

### **Player One Controls (Samurai Jack)**
- **Move Left**: A key
- **Move Right**: D key
- **Jump**: W key
- **Attack**: V key

### **Player Two Controls (Samurai Keni)**
- **Move Left**: Left arrow
- **Move Right**: Right arrow
- **Jump**: Up arrow
- **Attack**: Down arrow

---

## Sounds
- Each player has their **own attack sound**.
- There is a **death sound** triggered upon death.
- **Background music** is added.

---

## Game Structure

The game is written in **JavaScript**, using **Canvas** element manipulations with an **Object-Oriented Programming (OOP) design**. The structure consists of **three main JavaScript files**:

### **1. classes.js**
This file contains two main classes:

#### **Sprite Class**
Represents any canvas object with the following **properties**:
- **Height & Width**
- **Position**
- **Image**
- Other attributes required for rendering

##### **Methods**
- `draw()`: Draws the canvas based on the object's properties.
- `animateFrames()`: Animates the canvas sprite.
- `update()`: Triggers `draw()` and `animateFrames()`.

#### **Fighter Class**
Extends the **Sprite Class**, adding extra **properties** for fighting mechanics, such as **sounds, attacks, health, and key controls**.

##### **Methods**
- **Overwritten `update()`**: Calls `sprite.draw()`.
- `attack()`: Executes the player's attack.
- `takeHit()`: Determines how much health is lost upon taking a hit.
- `switchSprite()`: Changes the fighter's status (idle, attack, jump, death, taking a hit).

---

### **2. utilities.js**
Contains three core functions:
1. **`checkForCollision()`**: Checks if the attacker's sword collides with the other player.
2. **`determineWinner()`**: Tracks health bars and determines the winner when one player's health reaches zero.
3. **`decreaseTimer()`**: Starts the timer and calls `determineWinner()` when time runs out.

---

### **3. game.js**
This is the main **game loop** where objects are **created, managed, and animated**.

- Handles **gravity logic**.
- Manipulates and manages game elements.

---

## How to Run
1. Open `index.html` in a browser.
2. Use the **controls** to move and attack.
3. The game ends when a player's **health reaches 0** or **time runs out**.

Enjoy the battle! ⚔️🔥

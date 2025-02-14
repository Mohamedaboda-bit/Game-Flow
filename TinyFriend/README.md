# **Tiny Freind Game Documentation**

## **Overview**
The **Fox Pet Game** is a virtual pet simulation where the player takes care of a fox by fulfilling its needs such as feeding, cleaning, and managing its environment. The game is time-based, with the fox's state changing over time based on predefined events. The player interacts with the game using buttons to perform actions like feeding the fox, cleaning up poop, and changing the weather.

---

## **How to Run the Game**
1. **Prerequisites**:
   - A modern web browser (e.g., Chrome, Firefox, Edge).
   - A code editor (e.g., VS Code) to view and modify the code.

2. **Setup**:
   - Create an `index.html` file and include the game code in a `<script>` tag or link to an external JavaScript file.
   - Ensure the required images (e.g., fox sprites, background images) are available and correctly referenced in the code.

3. **Run the Game**:
   - Open the `index.html` file in a web browser.
   - Use the **Left** and **Right** buttons to navigate between icons.
   - Use the **Middle** button to perform actions (feed, clean, change weather).
   - Monitor the fox's needs and ensure it is fed and cleaned to prevent it from dying.

---

## **Key Features**
1. **Virtual Pet (Fox)**:
   - The fox has multiple states: **Egg**, **Idling**, **Hungry**, **Eating**, **Pooping**, **Celebrating**, **Sleeping**, **Rain**, and **Dead**.
   - The fox's state changes over time based on events like hunger, sleep, and pooping.

2. **Buttons**:
   - **Left Button**: Navigates to the previous icon (Fish, Poop, Weather).
   - **Middle Button**: Executes the selected action (Feed, Clean, Change Weather).
   - **Right Button**: Navigates to the next icon.

3. **Icons**:
   - **Fish Icon**: Feed the fox.
   - **Poop Icon**: Clean up poop.
   - **Weather Icon**: Change the weather between day and rain.

4. **Time-Based Events**:
   - The game updates the fox's state every second (`TICK_RATE = 1000`).
   - Events like hunger, pooping, and death occur at random intervals.

5. **Game Over**:
   - The game ends if the fox dies due to neglect.
   - The player can restart the game by pressing the middle button.

---

## **Game Structure**
The game is organized into several modules, each responsible for a specific part of the game logic. Below is a breakdown of the modules and their functionality.

### **1. `constants.js`**
This module contains the game's constants and utility functions.

**Properties**:
- `ICONS`: `["fish", "poop", "weather"]` - Icons for actions.
- `TICK_RATE`: `1000` - Time interval for game updates (in milliseconds).
- `RAIN_CHANCE`: `0.2` - Probability of rain.
- `SCENES`: `["day", "rain"]` - Possible weather states.
- `DAY_LENGTH`: `60` - Duration of the day (in ticks).
- `NIGHT_LENGTH`: `3` - Duration of the night (in ticks).

**Functions**:
- `getNextHungerTime(clock)`: Calculates the next time the fox will get hungry.
- `getNextDieTime(clock)`: Calculates the next time the fox will die if neglected.
- `getNextPoopTime(clock)`: Calculates the next time the fox will poop.

---

### **2. `buttons.js`**
This module handles button interactions.

**Functions**:
- `toggleHighlighted(iconIndex, show)`: Toggles the highlight state of an icon.
- `initButtons(handleUserAction)`: Initializes button event listeners and handles user actions.

---

### **3. `gameState.js`**
This module manages the game's state and logic.

**Properties**:
- `current`: The current state of the fox (e.g., "IDLING", "HUNGRY").
- `clock`: Tracks the game's time.
- `wakeTime`, `sleepTime`, `hungryTime`, `poopTime`, `dieTime`: Timers for specific events.
- `scene`: Tracks the current weather (day or rain).

**Methods**:
- `tick()`: Updates the game state every second.
- `startGame()`: Initializes the game.
- `wake()`, `sleep()`, `getHungry()`, `poop()`, `die()`: Handle state transitions.
- `handleUserAction(icon)`: Processes player actions (feed, clean, change weather).

---

### **4. `ui.js`**
This module manages the game's user interface.

**Functions**:
- `modFox(state)`: Updates the fox's sprite based on its state.
- `modScene(state)`: Updates the background scene based on the weather.
- `togglePoopBag(show)`: Toggles the visibility of the poop bag.
- `writeModal(text)`: Displays messages in the modal (e.g., game instructions, game-over message).

---

### **5. `init.js`**
This module initializes the game and sets up the game loop.

**Functions**:
- `nextAnimationFrame()`: Handles the game loop and updates the game state at regular intervals.

---

## **Classes**
The game is primarily driven by the `gameState` object, which acts as the main controller for the game logic. Below is a breakdown of its functionality.

### **1. `gameState` Object**
The `gameState` object manages the fox's state and events.

**Properties**:
- `current`: The current state of the fox.
- `clock`: Tracks the game's time.
- `wakeTime`, `sleepTime`, `hungryTime`, `poopTime`, `dieTime`: Timers for specific events.
- `scene`: Tracks the current weather (day or rain).

**Methods**:
- `tick()`: Updates the game state every second.
- `startGame()`: Initializes the game.
- `wake()`, `sleep()`, `getHungry()`, `poop()`, `die()`: Handle state transitions.
- `handleUserAction(icon)`: Processes player actions (feed, clean, change weather).

---

## **How to Play**
1. **Start the Game**:
   - Press the middle button to start. The fox begins in the **Egg** state and hatches after a few seconds.

2. **Interact with the Fox**:
   - Use the left and right buttons to navigate between icons.
   - Use the middle button to perform actions:
     - **Feed the Fox**: Select the Fish icon and press the middle button when the fox is hungry.
     - **Clean Up Poop**: Select the Poop icon and press the middle button when the fox has pooped.
     - **Change Weather**: Select the Weather icon and press the middle button to toggle between day and rain.

3. **Monitor the Fox's State**:
   - Keep an eye on the fox's needs. Neglecting feeding or cleaning may lead to the fox's death.

4. **Restart the Game**:
   - If the fox dies, press the middle button to restart the game.

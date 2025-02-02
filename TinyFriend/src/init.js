// constants.js
const ICONS = ["fish", "poop", "weather"];
const TICK_RATE = 1000;
const RAIN_CHANCE = 0.2;
const SCENES = ["day", "rain"];
const DAY_LENGTH = 60;
const NIGHT_LENGTH = 3;

const getNextHungerTime = (clock) => Math.floor(Math.random() * 3) + 5 + clock;
const getNextDieTime = (clock) => Math.floor(Math.random() * 2) + 3 + clock;
const getNextPoopTime = (clock) => Math.floor(Math.random() * 3) + 4 + clock;

// buttons.js
const toggleHighlighted = (iconIndex, show) => {
  document.querySelector(`.${ICONS[iconIndex]}-icon`).classList.toggle("highlighted", show);
};

function initButtons(handleUserAction) {
  let selectedIcon = 0;

  function buttonClick({ target }) {
    if (target.classList.contains("left-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (selectedIcon + ICONS.length - 1) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else if (target.classList.contains("right-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (selectedIcon + 1) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else if (target.classList.contains("middle-btn")) {
      handleUserAction(ICONS[selectedIcon]);
    }
  }

  document.querySelector(".buttons").addEventListener("click", buttonClick);
}

// gameState.js
const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  scene: 0,

  tick() {
    this.clock++;
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    } else if (this.clock === this.dieTime) {
      this.die();
    }
    return this.clock;
  },

  startGame() {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
    writeModal("");
  },

  wake() {
    this.current = "IDLING";
    this.wakeTime = -1;
    modFox("idling");
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
  },

  handleUserAction(icon) {
    if (["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)) {
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },

  changeWeather() {
    this.scene = (this.scene + 1) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },

  cleanUpPoop() {
    if (this.current === "POOPING") {
      this.dieTime = -1;
      togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = getNextHungerTime(this.clock);
    }
  },

  poop() {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },

  feed() {
    if (this.current !== "HUNGRY") return;
    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },

  startCelebrating() {
    this.current = "CELEBRATING";
    modFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },

  endCelebrating() {
    this.current = "IDLING";
    this.timeToEndCelebrating = -1;
    this.determineFoxState();
    togglePoopBag(false);
  },

  determineFoxState() {
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },

  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  },

  sleep() {
    this.current = "SLEEP";
    modFox("sleep");
    modScene("night");
    this.clearTimes();
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },

  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },

  die() {
    this.current = "DEAD";
    modScene("dead");
    modFox("dead");
    this.clearTimes();
    writeModal("The fox died. Press the middle button to start again!");
  },
};

// ui.js
const modFox = function modFox(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
};

const modScene = function modScene(state) {
  document.querySelector(".game").className = `game ${state}`;
};

const togglePoopBag = function togglePoopBag(show) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};

const writeModal = function writeModal(text = "") {
  document.querySelector(".modal").innerHTML = text
    ? `<div class="modal-inner">${text}</div>`
    : "";
};

// init.js
initButtons(gameState.handleUserAction.bind(gameState));

let nextTimeToTick = Date.now();
function nextAnimationFrame() {
  const now = Date.now();
  if (nextTimeToTick <= now) {
    gameState.tick();
    nextTimeToTick = now + TICK_RATE;
  }
  requestAnimationFrame(nextAnimationFrame);
}
nextAnimationFrame();

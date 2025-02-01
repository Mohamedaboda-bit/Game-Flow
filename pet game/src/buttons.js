import { ICONS } from "./constants.js";

const toggleHighlighted = (iconIndex, show) => {
  document
    .querySelector(`.${ICONS[iconIndex]}-icon`)
    .classList.toggle("highlighted", show);
};

export default function initButtons(handleUserAction) {
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

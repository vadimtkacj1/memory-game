import ManagerGame from "./class/ManagerGame.js";

const arrayPhoto = ["react", "vue", "ember", "angular", "backbone", "aurelia"];
const preloaderElem = document.querySelector(".preloader");
const memoryGame = document.querySelector(".memory-game");
const timerElement = document.querySelector(".timer");
const formatPhoto = "svg";

const manager = new ManagerGame(
  memoryGame,
  arrayPhoto,
  formatPhoto,
  timerElement,
  preloaderElem
);

manager.startGame();

const eventTouchDown = (event) => {
  const target = event.target;
  const parentTarget = target.parentElement;
  const targetObj = parentTarget.connectedCard;

  if (!targetObj) return;
  if (!targetObj.isFlipped) return;
  if (!manager.animationCheck) return;

  manager.animationCard(targetObj);
};

const eventTouchUp = (event) => {
  const target = event.target;

  if (manager.animationElement) return manager.animationCard();
  if (!target.closest("." + memoryGame.className)) return;

  const parentTarget = target.parentElement;
  const targetObj = parentTarget.connectedCard;

  if (!targetObj) return;
  if (targetObj.isFlipped) return;

  manager.selectCard(targetObj);
};

memoryGame.addEventListener("mousedown", eventTouchDown);
document.addEventListener("mouseup", eventTouchUp);
memoryGame.addEventListener("touchstart", eventTouchDown);
document.addEventListener("touchend", eventTouchUp);
memoryGame.addEventListener("touchstart", eventTouchDown);
document.addEventListener("touchend", eventTouchUp);

memoryGame.addEventListener("contextmenu", (event) => event.preventDefault());
memoryGame.addEventListener("dragstart", (event) => event.preventDefault());
document.addEventListener("selectstart", (event) => event.preventDefault());

document.body.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.closest(".button-restart")) return;
  if (target.closest(".win_button")) target.parentElement.remove();

  manager.restartGame();
});

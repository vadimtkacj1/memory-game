import Desk from "./Desk.js";
import Timer from "./Timer.js";
import preloader from "../preloader.js";

class ManagerGame {
  get boardElement() {
    return this.#boardElement;
  }

  get animationElement() {
    return this.#animationElement;
  }

  get animationCheck() {
    return this.#animationCheck;
  }

  get arrayImgLength() {
    if (!Array.isArray(this.#arrayImg)) return null;

    return this.#arrayImg.length;
  }

  #firstCard = null;
  #secondCard = null;
  #boardElement = document.body;
  #cardFlipCheck = false;
  #numberOfFlippedCards = 0;
  #arrayImg = null;
  #formatImg = null;
  #animationElement = null;
  #elementTimer = null;
  #animationCheck = false;
  #seconds;
  #preloaderElement;
  #timer = new Timer(this.#seconds);

  constructor(
    boardElement,
    arrayImg,
    formatImg,
    elementTimer,
    preloaderElement,
    seconds = 30
  ) {
    this.#boardElement = boardElement;
    this.#arrayImg = arrayImg;
    this.#formatImg = formatImg;
    this.#elementTimer = elementTimer;
    this.#preloaderElement = preloaderElement;
    this.#seconds = seconds;
  }

  async startGame() {
    const cards = this.#cards();

    this.#addCards(cards);

    await preloader();
    this.#preloaderElement.style.opacity = "0";
    this.#preparingGame(cards);

    await new Promise((resolve) => setTimeout(resolve, 800));
    this.#preloaderElement.remove();
  }

  restartGame() {
    const cards = this.#cards();

    this.#addCards(cards);
    this.#preparingGame(cards);
  }

  #cards() {
    const desk = new Desk(this.#arrayImg);
    const promiseCards = desk.createCards(this.#formatImg);

    return Promise.all(promiseCards);
  }

  #preparingGame(cards) {
    setTimeout(async () => {
      const arrayCards = await cards;
      arrayCards.forEach((elem) => elem.connectedCard.flip("flip"));

      await this.#flipCardsEndAnimation(arrayCards);
      this.#cardFlipCheck = true;
      this.#animationCheck = true;

      await this.#timer.start(this.#elementTimer);
      this.#popUpWindow("Время истекло");
      this.#timer.stop();
    }, 1000);
  }

  #flipCardsEndAnimation(cards) {
    return new Promise((resolve) => {
      cards[0].addEventListener("transitionend", resolve);
    });
  }

  async #addCards(cards) {
    this.#elementTimer.textContent = this.#seconds;
    this.boardElement.innerHTML = "";
    this.#numberOfFlippedCards = 0;
    this.#animationCheck = false;
    this.#cardFlipCheck = false;

    this.#timer.restart();

    const arrayCards = await cards;
    arrayCards.forEach((elem) => {
      elem.connectedCard.flip("flip");
      this.boardElement.append(elem);
    });
  }

  #resettingCards() {
    [this.#firstCard, this.#secondCard] = [null, null];
  }

  #popUpWindow(textContent) {
    const divParent = document.createElement("div");
    const divHeading = document.createElement("div");
    const divButton = document.createElement("div");

    divParent.classList.add("wrapper-win");
    divHeading.classList.add("win_heading");
    divButton.classList.add("win_button");
    divButton.classList.add("button-restart");

    divHeading.textContent = textContent;
    divButton.textContent = "Начать сначала";

    divParent.append(divHeading);
    divParent.append(divButton);

    document.body.append(divParent);

    setTimeout(() => {
      divParent.style.opacity = "1";
    }, 100);
  }

  animationCard(card) {
    if (this.animationElement) {
      this.#animationElement.flipAnimation("flip");

      return (this.#animationElement = null);
    }

    card.flipAnimation("flip");
    this.#animationElement = card;
  }

  selectCard(card) {
    if (!this.#cardFlipCheck) return;

    card.flip("flip");

    if (!this.#firstCard) return (this.#firstCard = card);
    if (!this.#secondCard && this.#firstCard.element !== card.element)
      this.#secondCard = card;
    if (
      this.#firstCard.element.getAttribute("data-name") !==
      this.#secondCard.element.getAttribute("data-name")
    ) {
      this.#cardFlipCheck = false;

      return setTimeout(() => {
        this.#firstCard.flip("flip");
        this.#secondCard.flip("flip");
        this.#resettingCards();
        this.#cardFlipCheck = true;
      }, 1000);
    }

    this.#numberOfFlippedCards++;
    this.#resettingCards();

    if (this.#numberOfFlippedCards !== this.arrayImgLength) return;

    this.#popUpWindow("Поздравляю вы победили!");
    this.#timer.stop();
  }
}

export default ManagerGame;

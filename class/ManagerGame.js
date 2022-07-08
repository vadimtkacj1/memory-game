import Desk from "./Desk.js";
import Timer from "./Timer.js";

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
  #second;
  #timer = new Timer(
    this.#second,
    this.#popUpWindow.bind(null, "Время истекло")
  );

  constructor(boardElement, arrayImg, formatImg, elementTimer, second = 30) {
    this.#boardElement = boardElement;
    this.#arrayImg = arrayImg;
    this.#formatImg = formatImg;
    this.#elementTimer = elementTimer;
    this.#second = second;
  }

  startGame() {
    this.#elementTimer.textContent = this.#second;
    this.boardElement.innerHTML = "";
    this.#animationCheck = false;

    this.#timer.restart();
    this.#timer.start(this.#elementTimer);

    const desk = new Desk(this.#arrayImg);
    const cards = desk.createCards(this.#formatImg);

    cards.forEach((e) => {
      e.connectedCard.flip("flip");
      this.boardElement.append(e);
    });

    setTimeout(() => {
      cards.forEach((e) => e.connectedCard.flip("flip"));
      this.#animationCheck = true;
      this.#cardFlipCheck = true;
    }, 1000);

    this.#numberOfFlippedCards = 0;
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

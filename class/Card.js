class Card {
  get isFlipped() {
    return this.#isFlipped;
  }

  get element() {
    return this.#element;
  }

  #img = null;
  #formatPhoto;
  #element = null;
  #isFlipped = false;

  constructor(img, formatPhoto = "jpg") {
    this.#img = img;
    this.#formatPhoto = formatPhoto;
  }

  createCard() {
    const div = document.createElement("div");
    const imgFront = document.createElement("img");
    const imgBack = document.createElement("img");

    div.classList.add("memory-card");
    div.dataset.name = this.#img;

    imgFront.classList.add("front-face");
    imgFront.src = `img/${this.#img}.${this.#formatPhoto}`;
    imgFront.alt = this.#img;

    imgBack.classList.add("back-face");
    imgBack.src = `img/js-badge.${this.#formatPhoto}`;
    imgBack.alt = "js-badge";

    div.append(imgBack);
    div.append(imgFront);

    div.connectedCard = this;
    this.#element = div;

    return div;
  }

  flipAnimation(nameCss) {
    this.#element.classList.toggle(nameCss);
  }

  flip(nameCss) {
    this.#element.classList.toggle(nameCss);
    this.#isFlipped = !this.#isFlipped;
  }
}

export default Card;

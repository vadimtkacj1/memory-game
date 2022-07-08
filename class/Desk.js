import Card from "./Card.js";

class Desk {
  #cards = [];
  #arrayImg;

  constructor(arrayImg) {
    this.#arrayImg = arrayImg;
  }

  createCards(formatImg) {
    this.#arrayImg.forEach((e) => {
      for (let i = 0; i < 2; i++) {
        const cardObj = new Card(e, formatImg);
        const card = cardObj.createCard();

        this.#cards.push(card);
      }
    });

    this.#shuffle(this.#cards);

    return this.#cards;
  }

  #shuffle() {
    for (let i = this.#cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]];
    }
  }
}

export default Desk;

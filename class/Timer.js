class Timer {
  #second;
  #workSecond = this.#second;
  #interval = null;
  #showFn = null;

  constructor(second = 30, func) {
    this.#second = second;
    this.#showFn = func;
  }

  start(element) {
    if (!element) return;

    element.innerHTMl = this.#workSecond;

    this.#interval = setInterval(() => {
      element.textContent = --this.#workSecond;

      if (this.#workSecond === 0) {
        clearInterval(this.#interval);
        this.#showFn();
        this.stop();
      }
    }, 1000);
  }

  restart() {
    this.#workSecond = this.#second;
    clearInterval(this.#interval);
  }

  stop() {
    this.#interval = clearInterval(this.#interval);
  }
}

export default Timer;

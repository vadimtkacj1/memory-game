class Timer {
  #seconds;
  #workSeconds = this.#seconds;
  #interval = null;

  constructor(seconds = 30) {
    this.#seconds = seconds;
  }

  start(element) {
    if (!element) return;

    if (this.#interval) clearInterval(this.#interval);

    element.innerHTMl = this.#workSeconds;

    return new Promise((resolve) => {
      this.#interval = setInterval(() => {
        element.textContent = --this.#workSeconds;

        if (this.#workSeconds === 0) {
          clearInterval(this.#interval);
          resolve();
        }
      }, 1000);
    });
  }

  restart() {
    this.#workSeconds = this.#seconds;
    clearInterval(this.#interval);
  }

  stop() {
    this.#interval = clearInterval(this.#interval);
  }
}

export default Timer;

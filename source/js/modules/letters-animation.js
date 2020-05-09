export default class LettersAnimation {
  constructor(selector, duration, wordClass, activeClass, property) {
    this._selector = selector;
    this._element = document.querySelector(this._selector);
    this._duration = duration;
    this._wordClass = wordClass;
    this._activeClass = activeClass;
    this._property = property;
    this._letterCount = 1;
    this._groupCount = 1;
    this._delay = 80;

    this.prepareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._duration}ms ease calc(var(--index) * ${this._delay * this._groupCount}ms)`;
    this._letterCount += 1;

    if (this._letterCount > 5) {
      this._letterCount = 1;
      this._groupCount += 1;
    }

    return span;
  }

  prepareText() {
    if (!this._element) {
      return;
    }

    const text = this._element.textContent.trim().split(` `).filter((letter) => letter !== ``);

    const content = text.reduce((wordContainer, word, wordIndex) => {
      const wordElement = Array.from(word).reduce((letterContainer, letter, letterIndex) => {
        const letterElement = this.createElement(letter);
        letterElement.style.setProperty(`--index`, `${((letterIndex + 1) % 2 === 0) ? 2 : 1}`);
        letterContainer.appendChild(letterElement);

        return letterContainer;
      }, document.createDocumentFragment());

      const span = document.createElement(`span`);
      span.classList.add(this._wordClass);
      span.style.setProperty(`--index`, `${wordIndex + 1}`);
      span.appendChild(wordElement);
      wordContainer.appendChild(span);

      return wordContainer;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }

    this._element.classList.add(this._activeClass);
  }

  destroyAnimation() {
    this._element.classList.remove(this._activeClass);
  }
}

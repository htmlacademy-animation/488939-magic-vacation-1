export default class LettersAnimation {
  constructor(selector, duration, wordClass, activeClass, property) {
    this.selector = selector;
    this.element = document.querySelector(this.selector);
    this.duration = duration;
    this.wordClass = wordClass;
    this.activeClass = activeClass;
    this.property = property;
    this.letterCount = 1;
    this.groupCount = 1;
    this.delay = 80;

    this.prepareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this.property} ${this.duration}ms ease calc(var(--index) * ${this.delay * this.groupCount}ms)`;
    this.letterCount += 1;

    if (this.letterCount > 5) {
      this.letterCount = 1;
      this.groupCount += 1;
    }

    return span;
  }

  prepareText() {
    if (!this.element) {
      return;
    }

    const text = this.element.textContent.trim().split(` `).filter((letter) => letter !== ``);

    const content = text.reduce((wordContainer, word, wordIndex) => {
      const wordElement = Array.from(word).reduce((letterContainer, letter, letterIndex) => {
        const letterElement = this.createElement(letter);
        letterElement.style.setProperty(`--index`, `${((letterIndex + 1) % 2 === 0) ? 2 : 1}`);
        letterContainer.appendChild(letterElement);

        return letterContainer;
      }, document.createDocumentFragment());

      const span = document.createElement(`span`);
      span.classList.add(this.wordClass);
      span.style.setProperty(`--index`, `${wordIndex + 1}`);
      span.appendChild(wordElement);
      wordContainer.appendChild(span);

      return wordContainer;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }

  runAnimation() {
    if (!this.element) {
      return;
    }

    this.element.classList.add(this.activeClass);
  }

  destroyAnimation() {
    this.element.classList.remove(this.activeClass);
  }
}

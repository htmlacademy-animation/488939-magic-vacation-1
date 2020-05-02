export default () => {
  const footerTogglers = [].slice.call(document.querySelectorAll(`.js-footer-toggler`));

  if (footerTogglers.length) {
    footerTogglers.forEach((toggler) => {
      toggler.addEventListener(`click`, () => {
        let footer = toggler.parentNode;

        if (footer.classList.contains(`screen__footer--full`)) {
          footer.classList.remove(`screen__footer--full`);
        } else {
          footer.classList.add(`screen__footer--full`);
        }
      });
    });
  }
};

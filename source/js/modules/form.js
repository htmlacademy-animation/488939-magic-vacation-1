export default () => {
  const emailFields = [].slice.call(document.querySelectorAll(`input[type="email"]`));
  const adaptPlaceholder = (el) => {
    if ((window.innerWidth / window.innerHeight < 1) || (window.innerWidth < 769)) {
      el.placeholder = `e-mail`;
      return;
    }

    el.placeholder = `e-mail для регистрации результата и получения приза`;
  };

  emailFields.forEach((field) => {
    adaptPlaceholder(field);
    window.addEventListener(`resize`, function () {
      adaptPlaceholder(field);
    });
  });
};

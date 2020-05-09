export default () => {
  const socialBlock = document.querySelector(`.js-social-block`);
  const socialList = document.querySelector(`.js-social-list`);
  const socialListItems = Array.from(socialList.querySelectorAll(`li`));

  socialBlock.addEventListener(`mouseover`, function () {
    socialBlock.classList.add(`social-block--active`);
  });
  socialBlock.addEventListener(`mouseleave`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });
  socialListItems.forEach((item, index) => {
    item.style.setProperty(`--index`, `${index + 1}`);
  });
};

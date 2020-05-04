export default () => {
  const header = document.querySelector(`.js-header`);
  const menuToggler = document.querySelector(`.js-menu-toggler`);
  const menuLinks = Array.from(document.querySelectorAll(`.js-menu-link`));

  if (menuToggler) {
    menuToggler.addEventListener(`click`, () => {
      if (header.classList.contains(`page-header--menu-opened`)) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      } else {
        header.classList.add(`page-header--menu-opened`);
        document.body.classList.add(`menu-opened`);
      }
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener(`click`, () => {
      if (window.innerWidth < 1025) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      }
    });
  });
};

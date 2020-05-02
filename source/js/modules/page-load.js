export default () => {
  const onPageLoad = () => {
    document.body.classList.add(`is-loaded`);
    window.removeEventListener(`load`, onPageLoad);
  };

  window.addEventListener(`load`, onPageLoad);
};

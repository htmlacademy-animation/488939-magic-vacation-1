import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = Array.from(document.querySelectorAll(`.screen:not(.screen--result)`));
    this.menuElements = Array.from(document.querySelectorAll(`.page-header__menu .js-menu-link`));

    this.atPageLoad = true;
    this.previousScreen = null;
    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChangedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT));
    window.addEventListener(`popstate`, this.onUrlHashChangedHandler);

    this.onUrlHashChanged();
    this.changePageDisplay();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = this.screenElements.findIndex((screen) => location.hash.slice(1) === screen.id);

    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    if (this.atPageLoad) {
      this.screenElements[this.activeScreen].classList.add(`active`);
      this.atPageLoad = false;
    }

    this.previousScreen = this.screenElements.find((screen) => screen.classList.contains(`active`));
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
      screen.classList.remove(`screen--animated`);
      screen.classList.remove(`screen--filled`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
    this.checkChangeOrder();
  }

  checkChangeOrder() {
    const activeScreen = this.screenElements[this.activeScreen];

    if (activeScreen.id !== `top`) {
      if (this.previousScreen.id === `story`) {
        activeScreen.classList.add(`screen--animated`);
        return;
      }

      activeScreen.classList.add(`screen--filled`);
    }
  }

  changeActiveMenuItem() {
    const activeItem = this.menuElements.find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);

    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}

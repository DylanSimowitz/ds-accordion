class Fold {
  constructor(element) {
    this.element = element;
    this.header = this.element.firstElementChild;
    this.panel = this.element.lastElementChild;
    this.state = {
      open: false,
    };
  }
  get open() {
    return this.state.open;
  }
  set open(value) {
    this.state.open = value;
    if (this.state.open) {
      this.element.dispatchEvent(this.events.open);
    } else {
      this.element.dispatchEvent(this.events.close);
    }
  }
  init() {
    this.element.classList.add('accordion__fold');
    this.panel.classList.add('accordion__panel');
    this.panelHeight = this.panel.offsetHeight;
    this.panel.style.height = '0px';
    this.header.classList.add('accordion__header');
    this.header.setAttribute('aria-expanded', false)
    this.element.addEventListener('open', this.onOpen.bind(this));
    this.element.addEventListener('close', this.onClose.bind(this));
    this.header.addEventListener('click', this.onClick.bind(this));
    this.events = {
      open: new CustomEvent('open', {
        detail: {
          fold: this,
        },
        bubbles: true,
      }),
      close: new CustomEvent('close', {
        detail: {
          fold: this,
        },
        bubbles: true,
      }),
    };
  }
  onOpen() {
    this.expand();
  }
  onClose() {
    this.collapse();
  }
  onClick() {
    this.open = !this.state.open;
  }
  collapse() {
    this.element.classList.remove('accordion__fold--expanded');
    this.header.setAttribute('aria-expanded', false)
    this.panel.classList.remove('accordion__panel--expanded');
    this.panel.style.height = '0px';
  }
  expand() {
    this.element.classList.add('accordion__fold--expanded');
    this.header.setAttribute('aria-expanded', true)
    this.panel.classList.add('accordion__panel--expanded');
    this.panel.style.height = `${this.panelHeight}px`;
  }
}

class Accordion {
  constructor(element) {
    this.element = document.querySelector(element);
    this.folds = [];
    this.state = {
    };
  }
  init() {
    this.createFolds();
    this.element.addEventListener('open', this.onOpen.bind(this));
  }
  onOpen(e) {
    this.folds.filter((fold) => {
      if (fold !== e.detail.fold) {
        fold.open = false;//eslint-disable-line
        return false;
      }
      return true;
    });
  }
  createFolds() {
    for (let i = 0; i < this.element.children.length; i += 1) {
      const fold = new Fold(this.element.children[i]);
      fold.init();
      this.folds.push(fold);
    }
  }
}


export default Accordion;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fold = function () {
  function Fold(element) {
    _classCallCheck(this, Fold);

    this.element = element;
    this.header = this.element.firstElementChild;
    this.panel = this.element.lastElementChild;
    this.state = {
      open: false
    };
  }

  _createClass(Fold, [{
    key: 'init',
    value: function init() {
      this.element.classList.add('accordion__fold');
      this.panel.classList.add('accordion__panel');
      this.panelHeight = this.panel.offsetHeight;
      this.panel.style.height = '0px';
      this.header.classList.add('accordion__header');
      this.header.setAttribute('aria-expanded', false);
      this.element.addEventListener('open', this.onOpen.bind(this));
      this.element.addEventListener('close', this.onClose.bind(this));
      this.header.addEventListener('click', this.onClick.bind(this));
      this.events = {
        open: new CustomEvent('open', {
          detail: {
            fold: this
          },
          bubbles: true
        }),
        close: new CustomEvent('close', {
          detail: {
            fold: this
          },
          bubbles: true
        })
      };
    }
  }, {
    key: 'onOpen',
    value: function onOpen() {
      this.expand();
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      this.collapse();
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      this.open = !this.state.open;
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.element.classList.remove('accordion__fold--expanded');
      this.header.setAttribute('aria-expanded', false);
      this.panel.classList.remove('accordion__panel--expanded');
      this.panel.style.height = '0px';
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.element.classList.add('accordion__fold--expanded');
      this.header.setAttribute('aria-expanded', true);
      this.panel.classList.add('accordion__panel--expanded');
      this.panel.style.height = this.panelHeight + 'px';
    }
  }, {
    key: 'open',
    get: function get() {
      return this.state.open;
    },
    set: function set(value) {
      this.state.open = value;
      if (this.state.open) {
        this.element.dispatchEvent(this.events.open);
      } else {
        this.element.dispatchEvent(this.events.close);
      }
    }
  }]);

  return Fold;
}();

var Accordion = function () {
  function Accordion(element) {
    _classCallCheck(this, Accordion);

    this.element = document.querySelector(element);
    this.folds = [];
    this.state = {};
  }

  _createClass(Accordion, [{
    key: 'init',
    value: function init() {
      this.createFolds();
      this.element.addEventListener('open', this.onOpen.bind(this));
    }
  }, {
    key: 'onOpen',
    value: function onOpen(e) {
      this.folds.filter(function (fold) {
        if (fold !== e.detail.fold) {
          fold.open = false; //eslint-disable-line
          return false;
        }
        return true;
      });
    }
  }, {
    key: 'createFolds',
    value: function createFolds() {
      for (var i = 0; i < this.element.children.length; i += 1) {
        var fold = new Fold(this.element.children[i]);
        fold.init();
        this.folds.push(fold);
      }
    }
  }]);

  return Accordion;
}();

exports.default = Accordion;

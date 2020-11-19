"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Carousel =
/*#__PURE__*/
function () {
  /**
   * This callback type is called `requestCallback` and is displayed as a global symbol.
   *
   * @callback moveCallback
   * @param {number} index
   */

  /**
   * @param {HTMLElement} element
   * @param {Object} options
   * @param {Object} [options.slidesToScroll=1] Nombre d'éléments à faire défiler
   * @param {Object} [options.slidesVisible=1] Nombre d'éléments visible dans un slide
   * @param {boolean} [options.loop=false] Doit-t-on boucler en fin de carousel
   * @param {boolean} [options.pagination=false]
   * @param {boolean} [options.navigation=true]
   */
  function Carousel(element) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Carousel);

    this.element = element;
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1,
      loop: false,
      pagination: false,
      navigation: true
    }, options);
    var children = [].slice.call(element.children);
    this.isMobile = false;
    this.currentItem = 0;
    this.moveCallbacks = []; // Modification du DOM

    this.root = this.createDivWithClass('carousel');
    this.container = this.createDivWithClass('carousel__container');
    this.root.setAttribute('tabindex', '0');
    this.root.appendChild(this.container);
    this.element.appendChild(this.root);
    this.items = children.map(function (child) {
      var item = _this.createDivWithClass('carousel__item');

      item.appendChild(child);

      _this.container.appendChild(item);

      return item;
    });
    this.setStyle();

    if (this.options.navigation) {
      this.createNavigation();
    }

    if (this.options.pagination) {
      this.createPagination();
    } // Evenements


    this.moveCallbacks.forEach(function (cb) {
      return cb(0);
    });
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.root.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        _this.next();
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        _this.prev();
      }
    });
  }
  /**
   * Applique les bonnes dimensions aux éléments du carousel
   */


  _createClass(Carousel, [{
    key: "setStyle",
    value: function setStyle() {
      var _this2 = this;

      var ratio = this.items.length / this.slidesVisible;
      this.container.style.width = ratio * 100 + "%";
      this.items.forEach(function (item) {
        return item.style.width = 100 / _this2.slidesVisible / ratio + "%";
      });
    }
    /**
     * Crée les flêches de navigation dans le DOM
     */

  }, {
    key: "createNavigation",
    value: function createNavigation() {
      var _this3 = this;

      var nextButton = this.createDivWithClass('carousel__next');
      var prevButton = this.createDivWithClass('carousel__prev');
      this.root.appendChild(nextButton);
      this.root.appendChild(prevButton);
      nextButton.addEventListener('click', this.next.bind(this));
      prevButton.addEventListener('click', this.prev.bind(this));

      if (this.options.loop === true) {
        return;
      }

      this.onMove(function (index) {
        if (index === 0) {
          prevButton.classList.add('carousel__prev--hidden');
        } else {
          prevButton.classList.remove('carousel__prev--hidden');
        }

        if (_this3.items[_this3.currentItem + _this3.slidesVisible] === undefined) {
          nextButton.classList.add('carousel__next--hidden');
        } else {
          nextButton.classList.remove('carousel__next--hidden');
        }
      });
    }
    /**
     * Crée la pagination dans le DOM
     */

  }, {
    key: "createPagination",
    value: function createPagination() {
      var _this4 = this;

      var pagination = this.createDivWithClass('carousel__pagination');
      var buttons = [];
      this.root.appendChild(pagination);

      var _loop = function _loop(i) {
        var button = _this4.createDivWithClass('carousel__pagination__button');

        button.addEventListener('click', function () {
          return _this4.gotoItem(i);
        });
        pagination.appendChild(button);
        buttons.push(button);
      };

      for (var i = 0; i < this.items.length; i = i + this.options.slidesToScroll) {
        _loop(i);
      }

      this.onMove(function (index) {
        var activeButton = buttons[Math.floor(index / _this4.options.slidesToScroll)];

        if (activeButton) {
          buttons.forEach(function (button) {
            return button.classList.remove('carousel__pagination__button--active');
          });
          activeButton.classList.add('carousel__pagination__button--active');
        }
      });
    }
    /**
     *
     */

  }, {
    key: "next",
    value: function next() {
      this.gotoItem(this.currentItem + this.slidesToScroll);
    }
  }, {
    key: "prev",
    value: function prev() {
      this.gotoItem(this.currentItem - this.slidesToScroll);
    }
    /**
     * Déplace le carousel vers l'élément ciblé
     * @param {number} index
     */

  }, {
    key: "gotoItem",
    value: function gotoItem(index) {
      if (index < 0) {
        if (this.options.loop) {
          index = this.items.length - this.slidesVisible;
        } else {
          return;
        }
      } else if (index >= this.items.length || this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem) {
        if (this.options.loop) {
          index = 0;
        } else {
          return;
        }
      }

      var translateX = index * -100 / this.items.length;
      this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
      this.currentItem = index;
      this.moveCallbacks.forEach(function (cb) {
        return cb(index);
      });
    }
    /**
     * Rajoute un écouteur qui écoute le déplacement du carousel
     * @param {moveCallback} cb
     */

  }, {
    key: "onMove",
    value: function onMove(cb) {
      this.moveCallbacks.push(cb);
    }
    /**
     * Ecouteur pour le redimensionnement de la fenêtre
     */

  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      var _this5 = this;

      var mobile = window.innerWidth < 800;

      if (mobile !== this.isMobile) {
        this.isMobile = mobile;
        this.setStyle();
        this.moveCallbacks.forEach(function (cb) {
          return cb(_this5.currentItem);
        });
      }
    }
    /**
     * Helper pour créer une div avec une classe
     * @param {string} className
     * @returns {HTMLElement}
     */

  }, {
    key: "createDivWithClass",
    value: function createDivWithClass(className) {
      var div = document.createElement('div');
      div.setAttribute('class', className);
      return div;
    }
    /**
     * @returns {number}
     */

  }, {
    key: "slidesToScroll",
    get: function get() {
      return this.isMobile ? 1 : this.options.slidesToScroll;
    }
    /**
     * @returns {number}
     */

  }, {
    key: "slidesVisible",
    get: function get() {
      return this.isMobile ? 1 : this.options.slidesVisible;
    }
  }]);

  return Carousel;
}();

var onReady = function onReady() {
  new Carousel(document.querySelector('#carousel2'), {
    slidesVisible: 2,
    slidesToScroll: 2,
    pagination: true,
    loop: true
  });
};

if (document.readyState !== 'loading') {
  onReady();
}

document.addEventListener('DOMContentLoaded', onReady);
//# sourceMappingURL=main.dev.js.map

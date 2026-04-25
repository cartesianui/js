// Based on https://github.com/alexradulescu/FreezeUI — heavily modified
(function () {
  var freezedItems = [];

  var getSelector = function (selector) {
    return selector ? selector : 'body';
  };

  var normalizeFreezeDelay = function (delay) {
    return delay ? delay : 250;
  };

  var shouldFreezeItem = function (selector) {
    var itemSelector = getSelector(selector);
    return freezedItems.indexOf(itemSelector) >= 0;
  };

  var addFreezedItem = function (selector) {
    var itemSelector = getSelector(selector);
    freezedItems.push(itemSelector);
  };

  var removeFreezedItem = function (selector) {
    var itemSelector = getSelector(selector);
    for (var i = 0; i < freezedItems.length; i++) {
      if (freezedItems[i] === itemSelector) {
        freezedItems.splice(i, 1);
      }
    }
  };

  /**
   * Build the freeze overlay element based on options.
   */
  var buildFreezeElement = function (options) {
    var el = document.createElement('div');
    el.classList.add('freeze-ui');

    // Backdrop style
    var backdrop = options.backdrop || 'blur';
    el.classList.add('freeze-backdrop-' + backdrop);

    if (options.backdropColor) {
      el.style.backgroundColor = options.backdropColor;
    }

    // Content wrapper
    var content = document.createElement('div');
    content.classList.add('freeze-content');

    // Loader: image | icon | css (default)
    var loaderType = options.loaderType || 'css';
    var loaderEl;

    if (loaderType === 'image' && options.loaderImage) {
      loaderEl = document.createElement('img');
      loaderEl.classList.add('freeze-loader-image');
      loaderEl.src = options.loaderImage;
      loaderEl.alt = 'Loading';
    } else if (loaderType === 'icon' && options.loaderIcon) {
      // Icon loader — caller passes any icon-font class string
      // (e.g. 'fa fa-circle-notch fa-spin fa-3x'). The class itself
      // controls visuals; we just provide the wrapper.
      loaderEl = document.createElement('div');
      loaderEl.classList.add('freeze-loader-icon');
      var iconEl = document.createElement('i');
      var classes = String(options.loaderIcon).trim().split(/\s+/);
      for (var i = 0; i < classes.length; i++) {
        if (classes[i]) iconEl.classList.add(classes[i]);
      }
      loaderEl.appendChild(iconEl);
    } else {
      loaderEl = document.createElement('div');
      loaderEl.classList.add('freeze-loader');
      loaderEl.classList.add(options.loaderCssClass || 'loader-spin');
    }

    content.appendChild(loaderEl);

    // Text
    var showText = options.showText !== undefined ? options.showText : true;
    if (showText && options.text && options.text.trim()) {
      var textEl = document.createElement('div');
      textEl.classList.add('freeze-text');
      textEl.textContent = options.text;
      content.appendChild(textEl);
    }

    el.appendChild(content);

    return el;
  };

  window.FreezeUI = function (options) {
    options = options || {};
    addFreezedItem(options.selector);
    var delay = normalizeFreezeDelay(options.delay);

    setTimeout(function () {
      if (!shouldFreezeItem(options.selector)) {
        return;
      }

      var parent;
      if (options.element) {
        parent = options.element;
      } else {
        parent = document.querySelector(options.selector) || document.body;
      }

      var freezeEl = buildFreezeElement(options);

      if (document.querySelector(options.selector) || options.element) {
        freezeEl.style.position = 'absolute';
      }

      parent.style.position = parent.style.position || 'relative';
      parent.appendChild(freezeEl);
    }, delay);
  };

  window.UnFreezeUI = function (options) {
    options = options || {};
    removeFreezedItem(options.selector);
    var delay = normalizeFreezeDelay(options.delay) + 250;

    setTimeout(function () {
      var freezeEl;
      if (options.element) {
        freezeEl = options.element.querySelector('.freeze-ui');
      } else {
        freezeEl = document.querySelector('.freeze-ui');
      }

      if (freezeEl) {
        freezeEl.classList.add('is-unfreezing');
        setTimeout(function () {
          if (freezeEl.parentElement) {
            freezeEl.parentElement.removeChild(freezeEl);
          }
        }, 300);
      }
    }, delay);
  };
})();

// taken from https://raw.githubusercontent.com/alexradulescu/FreezeUI and modified
(function () {
  var freezeHtml = document.createElement("div");
  freezeHtml.classList.add("freeze-ui");

  freezedItems = [];

  getSelector = function(selector) {
    return selector ? selector : "body";
  }

  normalizeFreezeDelay = function(delay) {
    return delay ? delay : 250;
  }

  shouldFreezeItem = function (selector) {
    itemSelector = getSelector(selector);
    return freezedItems.indexOf(itemSelector) >= 0;
  };

  addFreezedItem = function(selector) {
    itemSelector = getSelector(selector);
    freezedItems.push(itemSelector);
  };

  removeFreezedItem = function(selector) {
    itemSelector = getSelector(selector);
    for (i = 0; i < freezedItems.length; i++) {
      if (freezedItems[i] === itemSelector) {
        freezedItems.splice(i, 1);
      }
    }
  };

  window.FreezeUI = function(options) {
    addFreezedItem(options.selector);
    delay = normalizeFreezeDelay(options.delay);

    setTimeout(function(){
      if (!shouldFreezeItem(options.selector)) {
        return;
      }

      var parent;
      if (options.element) {
        parent = options.element;
      } else {
        parent = document.querySelector(options.selector) || document.body;
      }

      freezeHtml.setAttribute("data-text", options.text || "Loading");

      if (document.querySelector(options.selector) || options.element) {
        freezeHtml.style.position = "absolute";
      }

      parent.appendChild(freezeHtml);
    }, delay);
  };

  window.UnFreezeUI = function(options) {
    removeFreezedItem(options.selector);
    delay = normalizeFreezeDelay(options.delay) + 250;

    setTimeout(function() {
      var freezeHtml;
      if (options.element) {
        freezeHtml = options.element.querySelector(".freeze-ui");
      } else {
        freezeHtml = document.querySelector(".freeze-ui");
      }

      if (freezeHtml) {
        freezeHtml.classList.remove("is-unfreezing");
        if (freezeHtml.parentElement) {
          freezeHtml.parentElement.removeChild(freezeHtml);
        }
      }
    }, delay);
  };
})();

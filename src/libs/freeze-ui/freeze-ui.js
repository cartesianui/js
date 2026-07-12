// Based on https://github.com/alexradulescu/FreezeUI — heavily modified
(function () {
  // Each freeze tracks the PARENT node it targets (not a selector string), so
  // a global (body) freeze and an element-scoped (e.g. datatable) freeze are
  // distinct even though neither passes a selector. `cancelled` lets an
  // UnFreezeUI that fires during the show-delay abort the pending overlay.
  var freezes = [];

  var normalizeFreezeDelay = function (delay) {
    return delay ? delay : 250;
  };

  // Resolve the node a freeze targets — IDENTICALLY in FreezeUI + UnFreezeUI so
  // an overlay is always removed from the same node it was added to.
  var resolveParent = function (options) {
    if (options.element) {
      return options.element;
    }
    if (options.selector) {
      return document.querySelector(options.selector) || document.body;
    }
    return document.body;
  };

  // This parent's OWN overlay — a DIRECT child only. Crucially NOT a descendant:
  // a body-level clear must not rip out a nested (datatable) overlay, and vice
  // versa. Using `document.querySelector('.freeze-ui')` (first match anywhere)
  // was the stuck-loader bug — it removed whichever overlay came first in
  // document order, orphaning the other so it never got cleared.
  var ownOverlay = function (parent) {
    if (!parent || !parent.children) {
      return null;
    }
    for (var i = 0; i < parent.children.length; i++) {
      var child = parent.children[i];
      if (child.classList && child.classList.contains('freeze-ui')) {
        return child;
      }
    }
    return null;
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
    var parent = resolveParent(options);
    var entry = { parent: parent, cancelled: false };
    freezes.push(entry);
    var delay = normalizeFreezeDelay(options.delay);

    setTimeout(function () {
      // Cleared during the delay → don't show at all.
      if (entry.cancelled) {
        return;
      }
      // Already showing for this exact parent → don't stack a 2nd overlay.
      if (ownOverlay(parent)) {
        return;
      }

      var freezeEl = buildFreezeElement(options);

      // body → full-screen (CSS handles fixed positioning). Any other node →
      // absolute within that (relatively-positioned) node.
      if (parent !== document.body) {
        freezeEl.style.position = 'absolute';
        parent.style.position = parent.style.position || 'relative';
      }

      parent.appendChild(freezeEl);
    }, delay);
  };

  window.UnFreezeUI = function (options) {
    options = options || {};
    var parent = resolveParent(options);

    // Cancel the most recent still-pending freeze for THIS parent (so a clear
    // that arrives before the show-delay elapses aborts that overlay).
    for (var i = freezes.length - 1; i >= 0; i--) {
      if (freezes[i].parent === parent && !freezes[i].cancelled) {
        freezes[i].cancelled = true;
        freezes.splice(i, 1);
        break;
      }
    }

    var delay = normalizeFreezeDelay(options.delay) + 250;

    setTimeout(function () {
      // Only ever remove THIS parent's own overlay — never another node's.
      var freezeEl = ownOverlay(parent);

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

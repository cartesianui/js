var cartesian = cartesian || {};
(function () {
  cartesian.ui = cartesian.ui || {};

  // ─── Default Configuration ─────────────────────────────
  cartesian.ui.config = {
    loader: {
      type: 'css',                             // 'css' | 'image' | 'icon'
      cssClass: 'loader-spin',                 // built-in: 'loader-spin', 'loader-dots', 'loader-pulse', 'loader-bar'
      image: null,                             // URL to custom loading image (gif/svg/apng) — type='image'
      icon: null,                              // icon-font class (e.g. 'fa fa-circle-notch fa-spin fa-3x') — type='icon'
      text: 'Loading',                         // default loading text
      showText: true,                          // show/hide text below spinner
      backdrop: 'blur',                        // 'blur' | 'opacity' | 'none'
      backdropColor: 'rgba(255,255,255,0.85)', // backdrop color
    }
  };

  /**
   * Configure the UI loader globally.
   *
   * Usage:
   *   cartesian.ui.configure({
   *     loader: { cssClass: 'loader-dots', backdrop: 'blur', showText: false }
   *   });
   *
   *   cartesian.ui.configure({
   *     loader: { type: 'image', image: '/assets/loader.gif' }
   *   });
   *
   *   cartesian.ui.configure({
   *     loader: { type: 'icon', icon: 'fa fa-circle-notch fa-spin fa-3x' }
   *   });
   */
  cartesian.ui.configure = function (options) {
    if (options && options.loader) {
      var loader = cartesian.ui.config.loader;
      for (var key in options.loader) {
        if (options.loader.hasOwnProperty(key)) {
          loader[key] = options.loader[key];
        }
      }
    }
  };

  // UI Block - Defines UI Block API, not implements it
  cartesian.ui.block = function (elm) {
    cartesian.log.warn("cartesian.ui.block is not implemented!");
  };

  cartesian.ui.unblock = function (elm) {
    cartesian.log.warn("cartesian.ui.unblock is not implemented!");
  };

  // UI BUSY - Defines UI Busy API, not implements it
  cartesian.ui.setBusy = function (elm, text, delay) {
    cartesian.log.warn("cartesian.ui.setBusy is not implemented!");
  };

  cartesian.ui.clearBusy = function (elm, delay) {
    cartesian.log.warn("cartesian.ui.clearBusy is not implemented!");
  };
})();

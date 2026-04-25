var cartesian = cartesian || {};
(function () {
  if (!FreezeUI || !UnFreezeUI) {
    return;
  }

  cartesian.ui.setBusy = function (elm, text, delay) {
    var config = cartesian.ui.config.loader;

    FreezeUI({
      element: elm,
      text: (text || (config.showText ? config.text : '')) || ' ',
      delay: delay,
      loaderType: config.type,
      loaderCssClass: config.cssClass,
      loaderImage: config.image,
      loaderIcon: config.icon,
      backdrop: config.backdrop,
      backdropColor: config.backdropColor,
      showText: config.showText,
    });
  };

  cartesian.ui.clearBusy = function (elm, delay) {
    UnFreezeUI({ element: elm, delay: delay });
  };
})();

var cartesian = cartesian || {};
(function() {
  if (!FreezeUI || !UnFreezeUI) {
    return;
  }

  cartesian.ui.setBusy = function(elm, text, delay) {
    FreezeUI({
      element: elm,
      text: text ? text : " ",
      delay: delay,
    });
  };

  cartesian.ui.clearBusy = function(elm, delay) {
    UnFreezeUI({ element: elm, delay: delay });
  };
})();

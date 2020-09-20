var axis = axis || {};
(function() {
  if (!FreezeUI || !UnFreezeUI) {
    return;
  }

  axis.ui.setBusy = function(elm, text, delay) {
    FreezeUI({
      element: elm,
      text: text ? text : " ",
      delay: delay,
    });
  };

  axis.ui.clearBusy = function(elm, delay) {
    UnFreezeUI({ element: elm, delay: delay });
  };
})();

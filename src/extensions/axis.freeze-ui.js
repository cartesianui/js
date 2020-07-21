var axis = axis || {};
(() => {
  if (!FreezeUI || !UnFreezeUI) {
    return;
  }

  axis.ui.setBusy = (elm, text, delay) => {
    FreezeUI({
      element: elm,
      text: text ? text : " ",
      delay: delay,
    });
  };

  axis.ui.clearBusy = (elm, delay) => {
    UnFreezeUI({ element: elm, delay: delay });
  };
})();

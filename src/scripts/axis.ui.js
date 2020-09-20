var axis = axis || {};
(function () {
  axis.ui = axis.ui || {};

  // UI Block - Defines UI Block API, not implements it
  axis.ui.block = function (elm) {
    axis.log.warn("axis.ui.block is not implemented!");
  };

  axis.ui.unblock = function (elm) {
    axis.log.warn("axis.ui.unblock is not implemented!");
  };

  // UI BUSY - Defines UI Busy API, not implements it
  axis.ui.setBusy = function (elm, text, delay) {
    axis.log.warn("axis.ui.setBusy is not implemented!");
  };

  axis.ui.clearBusy = function (elm, delay) {
    axis.log.warn("axis.ui.clearBusy is not implemented!");
  };
})();

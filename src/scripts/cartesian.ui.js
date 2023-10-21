var cartesian = cartesian || {};
(function () {
  cartesian.ui = cartesian.ui || {};

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

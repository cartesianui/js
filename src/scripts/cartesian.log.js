var cartesian = cartesian || {};
(function () {
  cartesian.log = cartesian.log || {};

  cartesian.log.levels = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    FATAL: 5,
  };

  cartesian.log.level = cartesian.log.levels.DEBUG;

  cartesian.log.log = function (logObject, logLevel) {
    if (!window.console || !window.console.log) {
      return;
    }

    if (logLevel != undefined && logLevel < cartesian.log.level) {
      return;
    }
  };

  cartesian.log.debug = function (logObject) {
    cartesian.log.log("DEBUG: ", cartesian.log.levels.DEBUG);
    cartesian.log.log(logObject, cartesian.log.levels.DEBUG);
  };

  cartesian.log.info = function (logObject) {
    cartesian.log.log("INFO: ", cartesian.log.levels.INFO);
    cartesian.log.log(logObject, cartesian.log.levels.INFO);
  };

  cartesian.log.warn = function (logObject) {
    cartesian.log.log("WARN: ", cartesian.log.levels.WARN);
    cartesian.log.log(logObject, cartesian.log.levels.WARN);
  };

  cartesian.log.error = function (logObject) {
    cartesian.log.log("ERROR: ", cartesian.log.levels.ERROR);
    cartesian.log.log(logObject, cartesian.log.levels.ERROR);
  };

  cartesian.log.fatal = function (logObject) {
    cartesian.log.log("FATAL: ", cartesian.log.levels.FATAL);
    cartesian.log.log(logObject, cartesian.log.levels.FATAL);
  };
})();

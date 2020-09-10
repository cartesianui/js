var axis = axis || {};
(function () {
  axis.log = axis.log || {};

  axis.log.levels = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    FATAL: 5,
  };

  axis.log.level = axis.log.levels.DEBUG;

  axis.log.log = function (logObject, logLevel) {
    if (!window.console || !window.console.log) {
      return;
    }

    if (logLevel != undefined && logLevel < axis.log.level) {
      return;
    }
  };

  axis.log.debug = function (logObject) {
    axis.log.log("DEBUG: ", axis.log.levels.DEBUG);
    axis.log.log(logObject, axis.log.levels.DEBUG);
  };

  axis.log.info = function (logObject) {
    axis.log.log("INFO: ", axis.log.levels.INFO);
    axis.log.log(logObject, axis.log.levels.INFO);
  };

  axis.log.warn = function (logObject) {
    axis.log.log("WARN: ", axis.log.levels.WARN);
    axis.log.log(logObject, axis.log.levels.WARN);
  };

  axis.log.error = function (logObject) {
    axis.log.log("ERROR: ", axis.log.levels.ERROR);
    axis.log.log(logObject, axis.log.levels.ERROR);
  };

  axis.log.fatal = function (logObject) {
    axis.log.log("FATAL: ", axis.log.levels.FATAL);
    axis.log.log(logObject, axis.log.levels.FATAL);
  };
})();

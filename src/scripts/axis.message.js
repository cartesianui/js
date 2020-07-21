var axis = axis || {};
(function (define) {
  define(["jquery"], function ($) {

    axis.message = axis.message || {};

    var showMessage = function (message, title, options) {
      alert((title || "") + " " + message);

      if (!$) {
        axis.log.warn(
          "axis.message can not return promise since jQuery is not defined!"
        );
        return null;
      }

      return $.Deferred(function ($dfd) {
        $dfd.resolve();
      });
    };

    axis.message.info = function (message, title, options) {
      axis.log.warn("axis.message.info is not implemented!");
      return showMessage(message, title, options);
    };

    axis.message.success = function (message, title, options) {
      axis.log.warn("axis.message.success is not implemented!");
      return showMessage(message, title, options);
    };

    axis.message.warn = function (message, title, options) {
      axis.log.warn("axis.message.warn is not implemented!");
      return showMessage(message, title, options);
    };

    axis.message.error = function (message, title, options) {
      axis.log.warn("axis.message.error is not implemented!");
      return showMessage(message, title, options);
    };

    axis.message.confirm = function (message, title, callback, options) {
      axis.log.warn("axis.message.confirm is not implemented!");

      var result = confirm(message);
      callback && callback(result);

      if (!$) {
        axis.log.warn(
          "axis.message can not return promise since jQuery is not defined!"
        );
        return null;
      }

      return $.Deferred(function ($dfd) {
        $dfd.resolve();
      });
    };

    return axis;
  });
})(
  typeof define === "function" && define.amd
    ? define
    : function (deps, factory) {
        if (typeof module !== "undefined" && module.exports) {
          module.exports = factory(require("jquery"));
        } else {
          window.axis = factory(window.jQuery);
        }
      }
);

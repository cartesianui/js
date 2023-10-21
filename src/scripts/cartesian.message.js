var cartesian = cartesian || {};
(function (define) {
  define(["jquery"], function ($) {

    // Messages API - Defines Messages API, not implements it
    cartesian.message = cartesian.message || {};

    var showMessage = function (message, title, options) {
      alert((title || "") + " " + message);

      if (!$) {
        cartesian.log.warn(
          "cartesian.message can not return promise since jQuery is not defined!"
        );
        return null;
      }

      return $.Deferred(function ($dfd) {
        $dfd.resolve();
      });
    };

    cartesian.message.info = function (message, title, options) {
      cartesian.log.warn("cartesian.message.info is not implemented!");
      return showMessage(message, title, options);
    };

    cartesian.message.success = function (message, title, options) {
      cartesian.log.warn("cartesian.message.success is not implemented!");
      return showMessage(message, title, options);
    };

    cartesian.message.warn = function (message, title, options) {
      cartesian.log.warn("cartesian.message.warn is not implemented!");
      return showMessage(message, title, options);
    };

    cartesian.message.error = function (message, title, options) {
      cartesian.log.warn("cartesian.message.error is not implemented!");
      return showMessage(message, title, options);
    };

    cartesian.message.confirm = function (message, title, callback, options) {
      cartesian.log.warn("cartesian.message.confirm is not implemented!");

      var result = confirm(message);
      callback && callback(result);

      if (!$) {
        cartesian.log.warn(
          "cartesian.message can not return promise since jQuery is not defined!"
        );
        return null;
      }

      return $.Deferred(function ($dfd) {
        $dfd.resolve();
      });
    };

    return cartesian;
  });
})(
  typeof define === "function" && define.amd
    ? define
    : function (deps, factory) {
        if (typeof module !== "undefined" && module.exports) {
          module.exports = factory(require("jquery"));
        } else {
          window.cartesian = factory(window.jQuery);
        }
      }
);

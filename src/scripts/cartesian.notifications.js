var cartesian = cartesian || {};
(function (define) {
  define(["jquery"], function ($) {
    // Notification - Defines Notification API, not implements it
    cartesian.notifications = cartesian.notifications || {};

    cartesian.notifications.severity = {
      INFO: 0,
      SUCCESS: 1,
      WARN: 2,
      ERROR: 3,
      FATAL: 4,
    };

    cartesian.notifications.userNotificationState = {
      UNREAD: 0,
      READ: 1,
    };

    cartesian.notifications.getUserNotificationStateAsString = function (
      userNotificationState
    ) {
      switch (userNotificationState) {
        case cartesian.notifications.userNotificationState.READ:
          return "READ";
        case cartesian.notifications.userNotificationState.UNREAD:
          return "UNREAD";
        default:
          cartesian.log.warn(
            "Unknown user notification state value: " + userNotificationState
          );
          return "?";
      }
    };

    cartesian.notifications.getUiNotifyFuncBySeverity = function (severity) {
      switch (severity) {
        case cartesian.notifications.severity.SUCCESS:
          return cartesian.notify.success;
        case cartesian.notifications.severity.WARN:
          return cartesian.notify.warn;
        case cartesian.notifications.severity.ERROR:
          return cartesian.notify.error;
        case cartesian.notifications.severity.FATAL:
          return cartesian.notify.error;
        case cartesian.notifications.severity.INFO:
        default:
          return cartesian.notify.info;
      }
    };

    cartesian.notifications.messageFormatters = {};

    cartesian.notifications.messageFormatters[
      "Cartesian.Notifications.MessageNotificationData"
    ] = function (userNotification) {
      return (
        userNotification.notification.data.message ||
        userNotification.notification.data.properties.Message
      );
    };

    cartesian.notifications.messageFormatters[
      "Cartesian.Notifications.LocalizableMessageNotificationData"
    ] = function (userNotification) {
      var message =
        userNotification.notification.data.message ||
        userNotification.notification.data.properties.Message;
      var localizedMessage = cartesian.localization.localize(
        message.name,
        message.sourceName
      );

      if (userNotification.notification.data.properties) {
        if ($) {
          //Prefer to use jQuery if possible
          $.each(userNotification.notification.data.properties, function (
            key,
            value
          ) {
            localizedMessage = localizedMessage.replace("{" + key + "}", value);
          });
        } else {
          //alternative for $.each
          var properties = Object.keys(
            userNotification.notification.data.properties
          );
          for (var i = 0; i < properties.length; i++) {
            localizedMessage = localizedMessage.replace(
              "{" + properties[i] + "}",
              userNotification.notification.data.properties[properties[i]]
            );
          }
        }
      }

      return localizedMessage;
    };

    cartesian.notifications.getFormattedMessageFromUserNotification = function (
      userNotification
    ) {
      var formatter =
        cartesian.notifications.messageFormatters[
          userNotification.notification.data.type
        ];
      if (!formatter) {
        cartesian.log.warn(
          "No message formatter defined for given data type: " +
            userNotification.notification.data.type
        );
        return "?";
      }

      if (!cartesian.utils.isFunction(formatter)) {
        cartesian.log.warn(
          "Message formatter should be a function! It is invalid for data type: " +
            userNotification.notification.data.type
        );
        return "?";
      }

      return formatter(userNotification);
    };

    cartesian.notifications.showUiNotifyForUserNotification = function (
      userNotification,
      options
    ) {
      var message = cartesian.notifications.getFormattedMessageFromUserNotification(
        userNotification
      );
      var uiNotifyFunc = cartesian.notifications.getUiNotifyFuncBySeverity(
        userNotification.notification.severity
      );
      uiNotifyFunc(message, undefined, options);
    };

    // Notify - Defines Notification API, not implements it
    cartesian.notify = cartesian.notify || {};

    cartesian.notify.success = function (message, title, options) {
      cartesian.log.warn("cartesian.notify.success is not implemented!");
    };

    cartesian.notify.info = function (message, title, options) {
      cartesian.log.warn("cartesian.notify.info is not implemented!");
    };

    cartesian.notify.warn = function (message, title, options) {
      cartesian.log.warn("cartesian.notify.warn is not implemented!");
    };

    cartesian.notify.error = function (message, title, options) {
      cartesian.log.warn("cartesian.notify.error is not implemented!");
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

var axis = axis || {};
(function (define) {
  define(["jquery"], function ($) {
    //Defines Notification API, not implements it
    axis.notifications = axis.notifications || {};

    axis.notifications.severity = {
      INFO: 0,
      SUCCESS: 1,
      WARN: 2,
      ERROR: 3,
      FATAL: 4,
    };

    axis.notifications.userNotificationState = {
      UNREAD: 0,
      READ: 1,
    };

    axis.notifications.getUserNotificationStateAsString = function (
      userNotificationState
    ) {
      switch (userNotificationState) {
        case axis.notifications.userNotificationState.READ:
          return "READ";
        case axis.notifications.userNotificationState.UNREAD:
          return "UNREAD";
        default:
          axis.log.warn(
            "Unknown user notification state value: " + userNotificationState
          );
          return "?";
      }
    };

    axis.notifications.getUiNotifyFuncBySeverity = function (severity) {
      switch (severity) {
        case axis.notifications.severity.SUCCESS:
          return axis.notify.success;
        case axis.notifications.severity.WARN:
          return axis.notify.warn;
        case axis.notifications.severity.ERROR:
          return axis.notify.error;
        case axis.notifications.severity.FATAL:
          return axis.notify.error;
        case axis.notifications.severity.INFO:
        default:
          return axis.notify.info;
      }
    };

    axis.notifications.messageFormatters = {};

    axis.notifications.messageFormatters[
      "Axis.Notifications.MessageNotificationData"
    ] = function (userNotification) {
      return (
        userNotification.notification.data.message ||
        userNotification.notification.data.properties.Message
      );
    };

    axis.notifications.messageFormatters[
      "Axis.Notifications.LocalizableMessageNotificationData"
    ] = function (userNotification) {
      var message =
        userNotification.notification.data.message ||
        userNotification.notification.data.properties.Message;
      var localizedMessage = axis.localization.localize(
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

    axis.notifications.getFormattedMessageFromUserNotification = function (
      userNotification
    ) {
      var formatter =
        axis.notifications.messageFormatters[
          userNotification.notification.data.type
        ];
      if (!formatter) {
        axis.log.warn(
          "No message formatter defined for given data type: " +
            userNotification.notification.data.type
        );
        return "?";
      }

      if (!axis.utils.isFunction(formatter)) {
        axis.log.warn(
          "Message formatter should be a function! It is invalid for data type: " +
            userNotification.notification.data.type
        );
        return "?";
      }

      return formatter(userNotification);
    };

    axis.notifications.showUiNotifyForUserNotification = function (
      userNotification,
      options
    ) {
      var message = axis.notifications.getFormattedMessageFromUserNotification(
        userNotification
      );
      var uiNotifyFunc = axis.notifications.getUiNotifyFuncBySeverity(
        userNotification.notification.severity
      );
      uiNotifyFunc(message, undefined, options);
    };

    /* NOTIFICATION *********************************************/
    //Defines Notification API, not implements it

    axis.notify = axis.notify || {};

    axis.notify.success = function (message, title, options) {
      axis.log.warn("axis.notify.success is not implemented!");
    };

    axis.notify.info = function (message, title, options) {
      axis.log.warn("axis.notify.info is not implemented!");
    };

    axis.notify.warn = function (message, title, options) {
      axis.log.warn("axis.notify.warn is not implemented!");
    };

    axis.notify.error = function (message, title, options) {
      axis.log.warn("axis.notify.error is not implemented!");
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

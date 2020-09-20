var axis = axis || {};
(function () {
  if (!Swal) {
    return;
  }

  // Notification API Implementation using Sweet Alert
  var Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
  });

  var showNotification = function(type, message, title, options) {
    var icon = options.customClass.icon
      ? '<i class="mr-2 text-light ${options.customClass.icon}"></i>'
      : "";

    if (title) {
      options.title = '${icon}<span class="text-light">${title}</span>';
    }

    options.html = '${title ? "" : icon} <span class="text-light">${message}</span>';

    Toast.fire(options);
  };

  axis.notify.success = function(message, title, options) {
    showNotification(
      "success",
      message,
      title,
      Object.assign(
        {
          background: "#34bfa3",
          customClass: {
            icon: "fas fa-check-circle",
          },
        },
        options
      )
    );
  };

  axis.notify.info = function(message, title, options) {
    showNotification(
      "info",
      message,
      title,
      Object.assign(
        {
          background: "#36a3f7",
          customClass: {
            icon: "fas fa-info-circle",
          },
        },
        options
      )
    );
  };

  axis.notify.warn = function(message, title, options) {
    showNotification(
      "warning",
      message,
      title,
      Object.assign(
        {
          background: "#ffb822",
          customClass: {
            icon: "fas fa-exclamation-triangle",
          },
        },
        options
      )
    );
  };

  axis.notify.error = function(message, title, options) {
    showNotification(
      "error",
      message,
      title,
      Object.assign(
        {
          background: "#f4516c",
          customClass: {
            icon: "fas fa-exclamation-circle",
          },
        },
        options
      )
    );
  };
})();

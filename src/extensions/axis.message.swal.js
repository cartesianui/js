var axis = axis || {};
(function () {
  if (!Swal) {
    return;
  }

  // Message API Implementation, using Sweet Alert
  var showMessage = function(type, message, title, isHtml, options) {
    if (!title) {
      title = message;
      message = undefined;
    }

    options = options || {};
    options.title = title;
    options.icon = type;
    options.confirmButtonText =
      options.confirmButtonText || axis.localization.axisWeb("Ok");

    if (isHtml) {
      options.html = message;
    } else {
      options.text = message;
    }

    return Swal.fire(options);
  };

  axis.message.info = function(message, title, isHtml, options) {
    return showMessage("info", message, title, isHtml, options);
  };

  axis.message.success = function(message, title, isHtml, options) {
    return showMessage("success", message, title, isHtml, options);
  };

  axis.message.warn = function(message, title, isHtml, options) {
    return showMessage("warning", message, title, isHtml, options);
  };

  axis.message.error = function(message, title, isHtml, options) {
    return showMessage("error", message, title, isHtml, options);
  };

  axis.message.confirm = function(
    message,
    titleOrCallback,
    callback,
    isHtml,
    options
  ) {
    var title = undefined;

    if (typeof titleOrCallback === "function") {
      callback = titleOrCallback;
    } else if (titleOrCallback) {
      title = titleOrCallback;
    }

    options = options || {};
    options.title = title ? title : axis.localization.axisWeb("AreYouSure");
    options.icon = "warning";

    options.confirmButtonText =
      options.confirmButtonText || axis.localization.axisWeb("Yes");
    options.cancelButtonText =
      options.cancelButtonText || axis.localization.axisWeb("Cancel");
    options.showCancelButton = true;

    if (isHtml) {
      options.html = message;
    } else {
      options.text = message;
    }

    return Swal.fire(options).then(function (result) {
      callback && callback(result.value);
    });
  };

})();

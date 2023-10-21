var cartesian = cartesian || {};
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
      options.confirmButtonText || cartesian.localization.web("Ok");

    if (isHtml) {
      options.html = message;
    } else {
      options.text = message;
    }

    return Swal.fire(options);
  };

  cartesian.message.info = function(message, title, isHtml, options) {
    return showMessage("info", message, title, isHtml, options);
  };

  cartesian.message.success = function(message, title, isHtml, options) {
    return showMessage("success", message, title, isHtml, options);
  };

  cartesian.message.warn = function(message, title, isHtml, options) {
    return showMessage("warning", message, title, isHtml, options);
  };

  cartesian.message.error = function(message, title, isHtml, options) {
    return showMessage("error", message, title, isHtml, options);
  };

  cartesian.message.confirm = function(
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
    options.title = title ? title : cartesian.localization.web("AreYouSure");
    options.icon = "warning";

    options.confirmButtonText =
      options.confirmButtonText || cartesian.localization.web("Yes");
    options.cancelButtonText =
      options.cancelButtonText || cartesian.localization.web("Cancel");
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

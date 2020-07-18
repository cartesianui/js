(function () {
  var axis = window.axis || {};

  //Current application root path (including virtual directory if exists).
  axis.appPath = axis.appPath || "/";
  axis.pageLoadTime = new Date();

  //Converts given path to absolute path using axis.appPath variable.
  axis.toAbsAppPath = function (path) {
    if (path.indexOf("/") == 0) {
      path = path.substring(1);
    }
    return axis.appPath + path;
  };
})();

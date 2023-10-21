var cartesian = cartesian || {};
(function () {
  // Current application root path (including virtual directory if exists).
  cartesian.appPath = cartesian.appPath || "/";
  cartesian.pageLoadTime = new Date();

  // Converts given path to absolute path using cartesian.appPath variable.
  cartesian.toAbsAppPath = function (path) {
    if (path.indexOf("/") == 0) {
      path = path.substring(1);
    }
    return cartesian.appPath + path;
  };
})();

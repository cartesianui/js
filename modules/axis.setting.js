(function () {
  var axis = window.axis || {};
  //Implements Settings API that simplifies usage of setting scripts generated by Axis.
  axis.setting = axis.setting || {};

  axis.setting.values = axis.setting.values || {};

  axis.setting.get = function (name) {
    return axis.setting.values[name];
  };

  axis.setting.getBoolean = function (name) {
    var value = axis.setting.get(name);
    return value == "true" || value == "True";
  };

  axis.setting.getInt = function (name) {
    return parseInt(axis.setting.values[name]);
  };
})();

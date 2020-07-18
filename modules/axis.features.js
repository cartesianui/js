(function () {
  var axis = window.axis || {};
  //Implements Features API that simplifies usage of feature scripts generated by Axis.
  axis.features = axis.features || {};

  axis.features.allFeatures = axis.features.allFeatures || {};

  axis.features.get = function (name) {
    return axis.features.allFeatures[name];
  };

  axis.features.getValue = function (name) {
    var feature = axis.features.get(name);
    if (feature == undefined) {
      return undefined;
    }

    return feature.value;
  };

  axis.features.isEnabled = function (name) {
    var value = axis.features.getValue(name);
    return value == "true" || value == "True";
  };
})();

var cartesian = cartesian || {};
(function () {

  cartesian.localization = cartesian.localization || {};

  cartesian.localization.languages = [];

  cartesian.localization.currentLanguage = {};

  cartesian.localization.sources = [];

  cartesian.localization.values = {};

  cartesian.localization.localize = function (key, sourceName) {
    sourceName = sourceName || cartesian.localization.defaultSourceName;

    var source = cartesian.localization.values[sourceName];

    if (!source) {
      cartesian.log.warn("Could not find localization source: " + sourceName);
      return key;
    }

    var value = source[key];
    if (value == undefined) {
      return key;
    }

    var copiedArguments = Array.prototype.slice.call(arguments, 0);
    copiedArguments.splice(1, 1);
    copiedArguments[0] = value;

    return cartesian.utils.formatString.apply(this, copiedArguments);
  };

  cartesian.localization.getSource = function (sourceName) {
    return function (key) {
      var copiedArguments = Array.prototype.slice.call(arguments, 0);
      copiedArguments.splice(1, 0, sourceName);
      return cartesian.localization.localize.apply(this, copiedArguments);
    };
  };

  cartesian.localization.isCurrentCulture = function (name) {
    return (
      cartesian.localization.currentCulture &&
      cartesian.localization.currentCulture.name &&
      cartesian.localization.currentCulture.name.indexOf(name) == 0
    );
  };

  cartesian.localization.defaultSourceName = undefined;
  cartesian.localization.web = cartesian.localization.getSource("web");
})();

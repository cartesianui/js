var cartesian = cartesian || {};
(function () {
  cartesian.clock = cartesian.clock || {};

  cartesian.clock.now = function () {
    if (cartesian.clock.provider) {
      return cartesian.clock.provider.now();
    }

    return new Date();
  };

  cartesian.clock.normalize = function (date) {
    if (cartesian.clock.provider) {
      return cartesian.clock.provider.normalize(date);
    }

    return date;
  };

  cartesian.clock.provider = cartesian.timing.unspecifiedClockProvider;
})();

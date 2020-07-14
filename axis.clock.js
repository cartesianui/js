var axis = window.axis || {};
axis.clock = axis.clock || {};

axis.clock.now = function () {
  if (axis.clock.provider) {
    return axis.clock.provider.now();
  }

  return new Date();
}

axis.clock.normalize = function (date) {
  if (axis.clock.provider) {
    return axis.clock.provider.normalize(date);
  }

  return date;
}

axis.clock.provider = axis.timing.unspecifiedClockProvider;

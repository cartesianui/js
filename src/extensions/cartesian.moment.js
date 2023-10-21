var cartesian = cartesian || {};
(function () {
  if (!moment || !moment.tz) {
    return;
  }

  /* DEFAULTS *************************************************/

  cartesian.timing = cartesian.timing || {};

  /* FUNCTIONS **************************************************/

  cartesian.timing.convertToUserTimezone = function (date) {
    var momentDate = moment(date);
    var targetDate = momentDate
      .clone()
      .tz(cartesian.timing.timeZoneInfo.iana.timeZoneId);
    return targetDate;
  };
})();

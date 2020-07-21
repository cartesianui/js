var axis = axis || {};
(function () {
  if (!moment || !moment.tz) {
    return;
  }

  /* DEFAULTS *************************************************/

  axis.timing = axis.timing || {};

  /* FUNCTIONS **************************************************/

  axis.timing.convertToUserTimezone = function (date) {
    var momentDate = moment(date);
    var targetDate = momentDate
      .clone()
      .tz(axis.timing.timeZoneInfo.iana.timeZoneId);
    return targetDate;
  };
})();

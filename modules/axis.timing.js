(function () {
  var axis = window.axis || {};
  axis.timing = axis.timing || {};

  axis.timing.utcClockProvider = (function () {
    var toUtc = function (date) {
      return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
      );
    };

    var now = function () {
      return toUtc(new Date());
    };

    var normalize = function (date) {
      if (!date) {
        return date;
      }

      return new Date(toUtc(date));
    };

    // Public interface ///////////////////////////////////////////////////

    return {
      now: now,
      normalize: normalize,
      supportsMultipleTimezone: true,
    };
  })();

  axis.timing.localClockProvider = (function () {
    var toLocal = function (date) {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );
    };

    var now = function () {
      return toLocal(new Date());
    };

    var normalize = function (date) {
      if (!date) {
        return date;
      }

      return toLocal(date);
    };

    // Public interface ///////////////////////////////////////////////////

    return {
      now: now,
      normalize: normalize,
      supportsMultipleTimezone: false,
    };
  })();

  axis.timing.unspecifiedClockProvider = (function () {
    var now = function () {
      return new Date();
    };

    var normalize = function (date) {
      return date;
    };

    // Public interface ///////////////////////////////////////////////////

    return {
      now: now,
      normalize: normalize,
      supportsMultipleTimezone: false,
    };
  })();

  axis.timing.convertToUserTimezone = function (date) {
    var localTime = date.getTime();
    var utcTime = localTime + date.getTimezoneOffset() * 60000;
    var targetTime =
      parseInt(utcTime) +
      parseInt(axis.timing.timeZoneInfo.windows.currentUtcOffsetInMilliseconds);
    return new Date(targetTime);
  };
})();

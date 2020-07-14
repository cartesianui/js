var axis = window.axis || {};
axis.security = axis.security || {};
axis.security.antiForgery = axis.security.antiForgery || {};

axis.security.antiForgery.tokenCookieName = 'XSRF-TOKEN';
axis.security.antiForgery.tokenHeaderName = 'X-XSRF-TOKEN';

axis.security.antiForgery.getToken = function () {
  return axis.utils.getCookieValue(axis.security.antiForgery.tokenCookieName);
};

axis.security.antiForgery.shouldSendToken = function (settings) {
  if (settings.crossDomain === undefined || settings.crossDomain === null) {
    return axis.utils.getDomain(location.href) === axis.utils.getDomain(settings.url);
  }

  return !settings.crossDomain;
};
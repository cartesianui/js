var cartesian = cartesian || {};
(function () {
  cartesian.security = cartesian.security || {};
  cartesian.security.antiForgery = cartesian.security.antiForgery || {};

  cartesian.security.antiForgery.tokenCookieName = "XSRF-TOKEN";
  cartesian.security.antiForgery.tokenHeaderName = "X-XSRF-TOKEN";

  cartesian.security.antiForgery.getToken = function () {
    return cartesian.utils.getCookieValue(cartesian.security.antiForgery.tokenCookieName);
  };

  cartesian.security.antiForgery.shouldSendToken = function (settings) {
    if (settings.crossDomain === undefined || settings.crossDomain === null) {
      return (
        cartesian.utils.getDomain(location.href) ===
        cartesian.utils.getDomain(settings.url)
      );
    }

    return !settings.crossDomain;
  };
})();

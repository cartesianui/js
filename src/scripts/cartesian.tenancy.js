var cartesian = cartesian || {};
(function () {
  cartesian.tenancy = cartesian.tenancy || {};

  cartesian.tenancy.isEnabled = false;
  cartesian.tenancy.headerAttribute = 'Cartesian-Host';
  cartesian.tenancy.ignoreFeatureCheckForHostUsers = false;

  // Numeric codes for the active tenancy context. Mirrors the backend's
  // `tenancy.context` config block (Cartesian/Tenancy/Configs/tenancy.php)
  // emitted on the default-bundle response. `cartesian.session.context`
  // is set to one of these values on app boot.
  cartesian.tenancy.context = {
    TENANT: 1,
    HOST: 2,
  };

  cartesian.tenancy.tenantIdCookieName = "Cartesian.TenantId";

  cartesian.tenancy.setTenantIdCookie = function (tenantId) {
    if (tenantId) {
      cartesian.utils.setCookieValue(
        cartesian.tenancy.tenantIdCookieName,
        tenantId.toString(),
        new Date(new Date().getTime() + 5 * 365 * 86400000), //5 years
        cartesian.appPath,
        cartesian.domain
      );
    } else {
      cartesian.utils.deleteCookie(
        cartesian.tenancy.tenantIdCookieName,
        cartesian.appPath
      );
    }
  };

  cartesian.tenancy.getTenantIdCookie = function () {
    var value = cartesian.utils.getCookieValue(cartesian.tenancy.tenantIdCookieName);
    if (!value) {
      return null;
    }

    return parseInt(value);
  };
})();

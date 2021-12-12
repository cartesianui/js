var axis = axis || {};
(function () {
  axis.tenancy = axis.tenancy || {};

  axis.tenancy.isEnabled = false;
  axis.tenancy.hostAttribute = 'Axis-Host';
  axis.tenancy.ignoreFeatureCheckForHostUsers = false;

  axis.tenancy.sides = {
    TENANT: 1,
    HOST: 2,
  };

  axis.tenancy.tenantIdCookieName = "Axis.TenantId";

  axis.tenancy.setTenantIdCookie = function (tenantId) {
    if (tenantId) {
      axis.utils.setCookieValue(
        axis.tenancy.tenantIdCookieName,
        tenantId.toString(),
        new Date(new Date().getTime() + 5 * 365 * 86400000), //5 years
        axis.appPath,
        axis.domain
      );
    } else {
      axis.utils.deleteCookie(
        axis.tenancy.tenantIdCookieName,
        axis.appPath
      );
    }
  };

  axis.tenancy.getTenantIdCookie = function () {
    var value = axis.utils.getCookieValue(axis.tenancy.tenantIdCookieName);
    if (!value) {
      return null;
    }

    return parseInt(value);
  };
})();

var axis = axis || {};
(function () {
  axis.multiTenancy = axis.multiTenancy || {};

  axis.multiTenancy.isEnabled = false;
  axis.multiTenancy.ignoreFeatureCheckForHostUsers = false;

  axis.multiTenancy.sides = {
    TENANT: 1,
    HOST: 2,
  };

  axis.multiTenancy.tenantIdCookieName = "Axis.TenantId";

  axis.multiTenancy.setTenantIdCookie = function (tenantId) {
    if (tenantId) {
      axis.utils.setCookieValue(
        axis.multiTenancy.tenantIdCookieName,
        tenantId.toString(),
        new Date(new Date().getTime() + 5 * 365 * 86400000), //5 years
        axis.appPath,
        axis.domain
      );
    } else {
      axis.utils.deleteCookie(
        axis.multiTenancy.tenantIdCookieName,
        axis.appPath
      );
    }
  };

  axis.multiTenancy.getTenantIdCookie = function () {
    var value = axis.utils.getCookieValue(axis.multiTenancy.tenantIdCookieName);
    if (!value) {
      return null;
    }

    return parseInt(value);
  };

  /* SESSION */

  axis.session = axis.session || {
    multiTenancySide: axis.multiTenancy.sides.HOST,
  };
})();

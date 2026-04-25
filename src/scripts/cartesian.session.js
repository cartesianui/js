var cartesian = cartesian || {};
(function () {
    cartesian.session = cartesian.session || {};

    // Identity. Populated by the public `GET /v1/configurations`
    // default-bundle on app boot; preServe processors emit snake_case keys
    // server-side and the http adapter camelCases them on the wire.
    //
    // Owners (pa-api):
    //   user_id    → UserConfigurationProcessor
    //   tenant_id, is_host, is_admin, context → TenantConfigurationProcessor
    //   domain_id  → DomainConfigurationProcessor
    cartesian.session.userId = false;
    cartesian.session.tenantId = false;
    cartesian.session.domainId = false;
    cartesian.session.isHost = false;
    cartesian.session.isAdmin = false;
    cartesian.session.context = cartesian.tenancy.context.TENANT; // 1: Tenant, 2: Host

    cartesian.session.isHostAdmin = function () {
        return !!(cartesian.session.isHost && cartesian.session.isAdmin);
    };

    cartesian.session.isTenantAdmin = function () {
        return !!(cartesian.session.tenantId && cartesian.session.isAdmin);
    };

    cartesian.session.isUserLogged = function () {
        return !!cartesian.session.userId;
    };

    cartesian.session.isHostSide = function () {
        return cartesian.session.context === cartesian.tenancy.context.HOST;
    };

    cartesian.session.isTenantSide = function () {
        return cartesian.session.context === cartesian.tenancy.context.TENANT;
    };

})();

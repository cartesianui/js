var cartesian = cartesian || {};
(function () {
    cartesian.session = cartesian.session || {};

    cartesian.session.userId = false;
    cartesian.session.isAdmin = false;
    cartesian.session.hostId = false;
    cartesian.session.tenantId = false;
    cartesian.session.side = cartesian.tenancy.sides.TENANT; //1: Tenant, 2: Host

    cartesian.session.isHostAdmin = function () {
        if (cartesian.session.hostId && cartesian.session.isAdmin) {
           return true;
        }

        return false;
    };

    cartesian.session.isTenantAdmin = function () {
        if (cartesian.session.tenantId && cartesian.session.isAdmin) {
            return true;
        }

        return false;
    };

    cartesian.session.isUserLogged = function () {
        if (cartesian.session.userId) {
            return true;
        }
        return false;
    };

    cartesian.session.isHostSide = function () {
        if(cartesian.session.side === cartesian.tenancy.sides.HOST) {
            return true;
        }

        return false;
    }

    cartesian.session.isTenantSide = function () {
        if(cartesian.session.side === cartesian.tenancy.sides.TENANT) {
            return true;
        }

        return false;
    }

})();

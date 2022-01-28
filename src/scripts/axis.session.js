var axis = axis || {};
(function () {
    axis.session = axis.session || {};

    axis.session.userId = false;
    axis.session.isAdmin = false;
    axis.session.hostId = false;
    axis.session.tenantId = false;
    axis.session.side = axis.tenancy.sides.TENANT; //1: Tenant, 2: Host

    axis.session.isHostAdmin = function () {
        if (axis.session.hostId && axis.session.isAdmin) {
           return true;
        }

        return false;
    };

    axis.session.isTenantAdmin = function () {
        if (axis.session.tenantId && axis.session.isAdmin) {
            return true;
        }

        return false;
    };

    axis.session.isUserLogged = function () {
        if (axis.session.userId) {
            return true;
        }
        return false;
    };

    axis.session.isHostSide = function () {
        if(axis.session.side === axis.tenancy.sides.HOST) {
            return true;
        }

        return false;
    }

    axis.session.isTenantSide = function () {
        if(axis.session.side === axis.tenancy.sides.TENANT) {
            return true;
        }

        return false;
    }

})();

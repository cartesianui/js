var axis = axis || {};
(function () {
    if (!Swal) {
        return;
    }

    // Notification API Implementation using Sweet Alert
    var Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: function(toast) {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
    });

    var showNotification = function (type, message, title, options) {

        var _icon, _title, _html;

        _icon = options.customClass.icon
            ? "<i class=\"mr-2 text-light " + options.customClass.icon + "\"></i>"
            : false;

        _title = _icon ? _icon : "";
        _title += title ? "<span class=\"text-light\">" + title + "</span>" : "";

        _html = message
            ? "<span class=\"text-light\">" + message + "</span>"
            : "";

        if(_icon == false) {
            options.icon  = type.includes(['warning', 'error', 'success', 'info', 'question']) ? type : "";
        }
        options.title = _title;
        options.html = _html;

        Toast.fire(options);
    };

    axis.notify.success = function (message, title, options) {
        showNotification(
            "success",
            message,
            title,
            Object.assign(
                {
                    background: "#34bfa3",
                    customClass: {
                        icon: "fas fa-check-circle",
                    },
                },
                options
            )
        );
    };

    axis.notify.info = function (message, title, options) {
        showNotification(
            "info",
            message,
            title,
            Object.assign(
                {
                    background: "#36a3f7",
                    customClass: {
                        icon: "fas fa-info-circle",
                    },
                },
                options
            )
        );
    };

    axis.notify.warn = function (message, title, options) {
        showNotification(
            "warning",
            message,
            title,
            Object.assign(
                {
                    background: "#ffb822",
                    customClass: {
                        icon: "fas fa-exclamation-triangle",
                    },
                },
                options
            )
        );
    };

    axis.notify.error = function (message, title, options) {
        showNotification(
            "error",
            message,
            title,
            Object.assign(
                {
                    background: "#f4516c",
                    customClass: {
                        icon: "fas fa-exclamation-circle",
                    },
                },
                options
            )
        );
    };
})();

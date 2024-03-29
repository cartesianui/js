var cartesian = cartesian || {};
(function (define) {
  define(["jquery"], function ($) {
    cartesian.utils = cartesian.utils || {};

    /* Creates a name namespace.
     *  Example:
     *  var taskService = cartesian.utils.createNamespace(cartesian, 'services.task');
     *  taskService will be equal to cartesian.services.task
     *  first argument (root) must be defined first
     ************************************************************/
    cartesian.utils.createNamespace = function (root, ns) {
      var parts = ns.split(".");
      for (var i = 0; i < parts.length; i++) {
        if (typeof root[parts[i]] == "undefined") {
          root[parts[i]] = {};
        }

        root = root[parts[i]];
      }

      return root;
    };

    /* Find and replaces a string (search) to another string (replacement) in
     *  given string (str).
     *  Example:
     *  cartesian.utils.replaceAll('This is a test string', 'is', 'X') = 'ThX X a test string'
     ************************************************************/
    cartesian.utils.replaceAll = function (str, search, replacement) {
      var fix = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return str.replace(new RegExp(fix, "g"), replacement);
    };

    /* Formats a string just like string.format in C#.
     *  Example:
     *  cartesian.utils.formatString('Hello {0}','Tuana') = 'Hello Tuana'
     ************************************************************/
    cartesian.utils.formatString = function () {
      if (arguments.length < 1) {
        return null;
      }

      var str = arguments[0];

      for (var i = 1; i < arguments.length; i++) {
        var placeHolder = "{" + (i - 1) + "}";
        str = cartesian.utils.replaceAll(str, placeHolder, arguments[i]);
      }

      return str;
    };

    cartesian.utils.toPascalCase = function (str) {
      if (!str || !str.length) {
        return str;
      }

      if (str.length === 1) {
        return str.charAt(0).toUpperCase();
      }

      return str.charAt(0).toUpperCase() + str.substr(1);
    };

    cartesian.utils.toCamelCase = function (str) {
      if (!str || !str.length) {
        return str;
      }

      if (str.length === 1) {
        return str.charAt(0).toLowerCase();
      }

      return str.charAt(0).toLowerCase() + str.substr(1);
    };

    cartesian.utils.truncateString = function (str, maxLength) {
      if (!str || !str.length || str.length <= maxLength) {
        return str;
      }

      return str.substr(0, maxLength);
    };

    cartesian.utils.truncateStringWithPostfix = function (str, maxLength, postfix) {
      postfix = postfix || "...";

      if (!str || !str.length || str.length <= maxLength) {
        return str;
      }

      if (maxLength <= postfix.length) {
        return postfix.substr(0, maxLength);
      }

      return str.substr(0, maxLength - postfix.length) + postfix;
    };

    cartesian.utils.isFunction = function (obj) {
      if ($) {
        //Prefer to use jQuery if possible
        return $.isFunction(obj);
      }

      //alternative for $.isFunction
      return !!(obj && obj.constructor && obj.call && obj.apply);
    };

    /**
     * parameterInfos should be an array of { name, value } objects
     * where name is query string parameter name and value is it's value.
     * includeQuestionMark is true by default.
     */
    cartesian.utils.buildQueryString = function (
      parameterInfos,
      includeQuestionMark
    ) {
      if (includeQuestionMark === undefined) {
        includeQuestionMark = true;
      }

      var qs = "";

      function addSeperator() {
        if (!qs.length) {
          if (includeQuestionMark) {
            qs = qs + "?";
          }
        } else {
          qs = qs + "&";
        }
      }

      for (var i = 0; i < parameterInfos.length; ++i) {
        var parameterInfo = parameterInfos[i];
        if (parameterInfo.value === undefined) {
          continue;
        }

        if (parameterInfo.value === null) {
          parameterInfo.value = "";
        }

        addSeperator();

        if (
          parameterInfo.value.toJSON &&
          typeof parameterInfo.value.toJSON === "function"
        ) {
          qs =
            qs +
            parameterInfo.name +
            "=" +
            encodeURIComponent(parameterInfo.value.toJSON());
        } else if (
          Array.isArray(parameterInfo.value) &&
          parameterInfo.value.length
        ) {
          for (var j = 0; j < parameterInfo.value.length; j++) {
            if (j > 0) {
              addSeperator();
            }

            qs =
              qs +
              parameterInfo.name +
              "[" +
              j +
              "]=" +
              encodeURIComponent(parameterInfo.value[j]);
          }
        } else {
          qs =
            qs +
            parameterInfo.name +
            "=" +
            encodeURIComponent(parameterInfo.value);
        }
      }

      return qs;
    };

    /**
     * Sets a cookie value for given key.
     * This is a simple implementation created to be used by Cartesian.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @param {string} value
     * @param {Date} expireDate (optional). If not specified the cookie will expire at the end of session.
     * @param {string} path (optional)
     */
    cartesian.utils.setCookieValue = function (
      key,
      value,
      expireDate,
      path,
      domain
    ) {
      var cookieValue = encodeURIComponent(key) + "=";

      if (value) {
        cookieValue = cookieValue + encodeURIComponent(value);
      }

      if (expireDate) {
        cookieValue = cookieValue + "; expires=" + expireDate.toUTCString();
      }

      if (path) {
        cookieValue = cookieValue + "; path=" + path;
      }

      if (domain) {
        cookieValue = cookieValue + "; domain=" + domain;
      }

      document.cookie = cookieValue;
    };

    /**
     * Gets a cookie with given key.
     * This is a simple implementation created to be used by Cartesian.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @returns {string} Cookie value or null
     */
    cartesian.utils.getCookieValue = function (key) {
      var equalities = document.cookie.split("; ");
      for (var i = 0; i < equalities.length; i++) {
        if (!equalities[i]) {
          continue;
        }

        var splitted = equalities[i].split("=");
        if (splitted.length != 2) {
          continue;
        }

        if (decodeURIComponent(splitted[0]) === key) {
          return decodeURIComponent(splitted[1] || "");
        }
      }

      return null;
    };

    /**
     * Deletes cookie for given key.
     * This is a simple implementation created to be used by Cartesian.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @param {string} path (optional)
     */
    cartesian.utils.deleteCookie = function (key, path) {
      var cookieValue = encodeURIComponent(key) + "=";

      cookieValue =
        cookieValue +
        "; expires=" +
        new Date(new Date().getTime() - 86400000).toUTCString();

      if (path) {
        cookieValue = cookieValue + "; path=" + path;
      }

      document.cookie = cookieValue;
    };

    /**
     * Gets the domain of given url
     * @param {string} url
     * @returns {string}
     */
    cartesian.utils.getDomain = function (url) {
      var domainRegex = /(https?:){0,1}\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
      var matches = domainRegex.exec(url);
      return matches && matches[2] ? matches[2] : "";
    };

    return cartesian;
  });
})(
  typeof define === "function" && define.amd
    ? define
    : function (deps, factory) {
        if (typeof module !== "undefined" && module.exports) {
          module.exports = factory(require("jquery"));
        } else {
          window.cartesian = factory(window.jQuery);
        }
      }
);

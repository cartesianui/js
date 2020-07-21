!function(){var e=window.axis||{};e.auth=e.auth||{},e.auth.allPermissions=e.auth.allPermissions||{},e.auth.grantedPermissions=e.auth.grantedPermissions||{},e.auth.hasPermission=function(t){return e.auth.isGranted.apply(this,arguments)},e.auth.hasAnyOfPermissions=function(){return e.auth.isAnyGranted.apply(this,arguments)},e.auth.hasAllOfPermissions=function(){return e.auth.areAllGranted.apply(this,arguments)},e.auth.isGranted=function(t){return null!=e.auth.allPermissions[t]&&null!=e.auth.grantedPermissions[t]},e.auth.isAnyGranted=function(){if(!arguments||arguments.length<=0)return!0;for(var t=0;t<arguments.length;t++)if(e.auth.isGranted(arguments[t]))return!0;return!1},e.auth.areAllGranted=function(){if(!arguments||arguments.length<=0)return!0;for(var t=0;t<arguments.length;t++)if(!e.auth.isGranted(arguments[t]))return!1;return!0},e.auth.tokenCookieName="Axis.AuthToken",e.auth.setToken=function(t,n){e.utils.setCookieValue(e.auth.tokenCookieName,t,n,e.appPath,e.domain)},e.auth.getToken=function(){return e.utils.getCookieValue(e.auth.tokenCookieName)},e.auth.clearToken=function(){e.auth.setToken()},e.auth.refreshTokenCookieName="Axis.AuthRefreshToken",e.auth.setRefreshToken=function(t,n){e.utils.setCookieValue(e.auth.refreshTokenCookieName,t,n,e.appPath,e.domain)},e.auth.getRefreshToken=function(){return e.utils.getCookieValue(e.auth.refreshTokenCookieName)},e.auth.clearRefreshToken=function(){e.auth.setRefreshToken()}}(),function(){var e=window.axis||{};e.clock=e.clock||{},e.clock.now=function(){return e.clock.provider?e.clock.provider.now():new Date},e.clock.normalize=function(t){return e.clock.provider?e.clock.provider.normalize(t):t},e.clock.provider=e.timing.unspecifiedClockProvider}(),function(){var e;(window.axis||{}).event=(e={},{on:function(t,n){e[t]||(e[t]=[]),e[t].push(n)},off:function(t,n){var i=e[t];if(i){for(var o=-1,a=0;a<i.length;a++)if(i[a]===n){o=a;break}o<0||e[t].splice(o,1)}},trigger:function(t){var n=e[t];if(n&&n.length)for(var i=Array.prototype.slice.call(arguments,1),o=0;o<n.length;o++)n[o].apply(this,i)}})}(),function(){var e=window.axis||{};e.features=e.features||{},e.features.allFeatures=e.features.allFeatures||{},e.features.get=function(t){return e.features.allFeatures[t]},e.features.getValue=function(t){var n=e.features.get(t);if(null!=n)return n.value},e.features.isEnabled=function(t){var n=e.features.getValue(t);return"true"==n||"True"==n}}(),function(){var e=window.axis||{};e.localization=e.localization||{},e.localization.languages=[],e.localization.currentLanguage={},e.localization.sources=[],e.localization.values={},e.localization.localize=function(t,n){n=n||e.localization.defaultSourceName;var i=e.localization.values[n];if(!i)return e.log.warn("Could not find localization source: "+n),t;var o=i[t];if(null==o)return t;var a=Array.prototype.slice.call(arguments,0);return a.splice(1,1),a[0]=o,e.utils.formatString.apply(this,a)},e.localization.getSource=function(t){return function(n){var i=Array.prototype.slice.call(arguments,0);return i.splice(1,0,t),e.localization.localize.apply(this,i)}},e.localization.isCurrentCulture=function(t){return e.localization.currentCulture&&e.localization.currentCulture.name&&0==e.localization.currentCulture.name.indexOf(t)},e.localization.defaultSourceName=void 0,e.localization.axisWeb=e.localization.getSource("AxisWeb")}(),function(){var e=window.axis||{};e.log=e.log||{},e.log.levels={DEBUG:1,INFO:2,WARN:3,ERROR:4,FATAL:5},e.log.level=e.log.levels.DEBUG,e.log.log=function(t,n){window.console&&window.console.log&&(null!=n&&n<e.log.level||console.log(t))},e.log.debug=function(t){e.log.log("DEBUG: ",e.log.levels.DEBUG),e.log.log(t,e.log.levels.DEBUG)},e.log.info=function(t){e.log.log("INFO: ",e.log.levels.INFO),e.log.log(t,e.log.levels.INFO)},e.log.warn=function(t){e.log.log("WARN: ",e.log.levels.WARN),e.log.log(t,e.log.levels.WARN)},e.log.error=function(t){e.log.log("ERROR: ",e.log.levels.ERROR),e.log.log(t,e.log.levels.ERROR)},e.log.fatal=function(t){e.log.log("FATAL: ",e.log.levels.FATAL),e.log.log(t,e.log.levels.FATAL)}}(),("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.axis=t(window.jQuery)})(["jquery"],function(e){var t=window.axis||{};function n(n,i,o){return alert((i||"")+" "+n),e?e.Deferred(function(e){e.resolve()}):(t.log.warn("axis.message can not return promise since jQuery is not defined!"),null)}t.message=t.message||{},t.message.info=function(e,i,o){return t.log.warn("axis.message.info is not implemented!"),n(e,i)},t.message.success=function(e,i,o){return t.log.warn("axis.message.success is not implemented!"),n(e,i)},t.message.warn=function(e,i,o){return t.log.warn("axis.message.warn is not implemented!"),n(e,i)},t.message.error=function(e,i,o){return t.log.warn("axis.message.error is not implemented!"),n(e,i)},t.message.confirm=function(n,i,o,a){t.log.warn("axis.message.confirm is not implemented!");var r=confirm(n);return o&&o(r),e?e.Deferred(function(e){e.resolve()}):(t.log.warn("axis.message can not return promise since jQuery is not defined!"),null)}}),function(){var e=window.axis||{};e.multiTenancy=e.multiTenancy||{},e.multiTenancy.isEnabled=!1,e.multiTenancy.ignoreFeatureCheckForHostUsers=!1,e.multiTenancy.sides={TENANT:1,HOST:2},e.multiTenancy.tenantIdCookieName="Axis.TenantId",e.multiTenancy.setTenantIdCookie=function(t){t?e.utils.setCookieValue(e.multiTenancy.tenantIdCookieName,t.toString(),new Date((new Date).getTime()+15768e7),e.appPath,e.domain):e.utils.deleteCookie(e.multiTenancy.tenantIdCookieName,e.appPath)},e.multiTenancy.getTenantIdCookie=function(){var t=e.utils.getCookieValue(e.multiTenancy.tenantIdCookieName);return t?parseInt(t):null},e.session=e.session||{multiTenancySide:e.multiTenancy.sides.HOST}}(),("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.axis=t(window.jQuery)})(["jquery"],function(e){var t=window.axis||{};t.notifications=t.notifications||{},t.notifications.severity={INFO:0,SUCCESS:1,WARN:2,ERROR:3,FATAL:4},t.notifications.userNotificationState={UNREAD:0,READ:1},t.notifications.getUserNotificationStateAsString=function(e){switch(e){case t.notifications.userNotificationState.READ:return"READ";case t.notifications.userNotificationState.UNREAD:return"UNREAD";default:return t.log.warn("Unknown user notification state value: "+e),"?"}},t.notifications.getUiNotifyFuncBySeverity=function(e){switch(e){case t.notifications.severity.SUCCESS:return t.notify.success;case t.notifications.severity.WARN:return t.notify.warn;case t.notifications.severity.ERROR:case t.notifications.severity.FATAL:return t.notify.error;case t.notifications.severity.INFO:default:return t.notify.info}},t.notifications.messageFormatters={},t.notifications.messageFormatters["Axis.Notifications.MessageNotificationData"]=function(e){return e.notification.data.message||e.notification.data.properties.Message},t.notifications.messageFormatters["Axis.Notifications.LocalizableMessageNotificationData"]=function(n){var i=n.notification.data.message||n.notification.data.properties.Message,o=t.localization.localize(i.name,i.sourceName);if(n.notification.data.properties)if(e)e.each(n.notification.data.properties,function(e,t){o=o.replace("{"+e+"}",t)});else for(var a=Object.keys(n.notification.data.properties),r=0;r<a.length;r++)o=o.replace("{"+a[r]+"}",n.notification.data.properties[a[r]]);return o},t.notifications.getFormattedMessageFromUserNotification=function(e){var n=t.notifications.messageFormatters[e.notification.data.type];return n?t.utils.isFunction(n)?n(e):(t.log.warn("Message formatter should be a function! It is invalid for data type: "+e.notification.data.type),"?"):(t.log.warn("No message formatter defined for given data type: "+e.notification.data.type),"?")},t.notifications.showUiNotifyForUserNotification=function(e,n){var i=t.notifications.getFormattedMessageFromUserNotification(e);t.notifications.getUiNotifyFuncBySeverity(e.notification.severity)(i,void 0,n)},t.notify=t.notify||{},t.notify.success=function(e,n,i){t.log.warn("axis.notify.success is not implemented!")},t.notify.info=function(e,n,i){t.log.warn("axis.notify.info is not implemented!")},t.notify.warn=function(e,n,i){t.log.warn("axis.notify.warn is not implemented!")},t.notify.error=function(e,n,i){t.log.warn("axis.notify.error is not implemented!")}}),function(){var e=window.axis||{};e.appPath=e.appPath||"/",e.pageLoadTime=new Date,e.toAbsAppPath=function(t){return 0==t.indexOf("/")&&(t=t.substring(1)),e.appPath+t}}(),function(){var e=window.axis||{};e.security=e.security||{},e.security.antiForgery=e.security.antiForgery||{},e.security.antiForgery.tokenCookieName="XSRF-TOKEN",e.security.antiForgery.tokenHeaderName="X-XSRF-TOKEN",e.security.antiForgery.getToken=function(){return e.utils.getCookieValue(e.security.antiForgery.tokenCookieName)},e.security.antiForgery.shouldSendToken=function(t){return void 0===t.crossDomain||null===t.crossDomain?e.utils.getDomain(location.href)===e.utils.getDomain(t.url):!t.crossDomain}}(),function(){var e=window.axis||{};e.setting=e.setting||{},e.setting.values=e.setting.values||{},e.setting.get=function(t){return e.setting.values[t]},e.setting.getBoolean=function(t){var n=e.setting.get(t);return"true"==n||"True"==n},e.setting.getInt=function(t){return parseInt(e.setting.values[t])}}(),function(){var e=window.axis||{};function t(e){return Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds())}function n(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds())}e.timing=e.timing||{},e.timing.utcClockProvider={now:function(){return t(new Date)},normalize:function(e){return e?new Date(t(e)):e},supportsMultipleTimezone:!0},e.timing.localClockProvider={now:function(){return n(new Date)},normalize:function(e){return e?n(e):e},supportsMultipleTimezone:!1},e.timing.unspecifiedClockProvider={now:function(){return new Date},normalize:function(e){return e},supportsMultipleTimezone:!1},e.timing.convertToUserTimezone=function(t){var n=t.getTime()+6e4*t.getTimezoneOffset(),i=parseInt(n)+parseInt(e.timing.timeZoneInfo.windows.currentUtcOffsetInMilliseconds);return new Date(i)}}(),function(){var e=window.axis||{};e.ui=e.ui||{},e.ui.block=function(t){e.log.warn("axis.ui.block is not implemented!")},e.ui.unblock=function(t){e.log.warn("axis.ui.unblock is not implemented!")},e.ui.setBusy=function(t,n){e.log.warn("axis.ui.setBusy is not implemented!")},e.ui.clearBusy=function(t){e.log.warn("axis.ui.clearBusy is not implemented!")}}(),("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.axis=t(window.jQuery)})(["jquery"],function(e){var t=window.axis||{};t.utils=t.utils||{},t.utils.createNamespace=function(e,t){for(var n=t.split("."),i=0;i<n.length;i++)void 0===e[n[i]]&&(e[n[i]]={}),e=e[n[i]];return e},t.utils.replaceAll=function(e,t,n){var i=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return e.replace(new RegExp(i,"g"),n)},t.utils.formatString=function(){if(arguments.length<1)return null;for(var e=arguments[0],n=1;n<arguments.length;n++){var i="{"+(n-1)+"}";e=t.utils.replaceAll(e,i,arguments[n])}return e},t.utils.toPascalCase=function(e){return e&&e.length?1===e.length?e.charAt(0).toUpperCase():e.charAt(0).toUpperCase()+e.substr(1):e},t.utils.toCamelCase=function(e){return e&&e.length?1===e.length?e.charAt(0).toLowerCase():e.charAt(0).toLowerCase()+e.substr(1):e},t.utils.truncateString=function(e,t){return!e||!e.length||e.length<=t?e:e.substr(0,t)},t.utils.truncateStringWithPostfix=function(e,t,n){return n=n||"...",!e||!e.length||e.length<=t?e:t<=n.length?n.substr(0,t):e.substr(0,t-n.length)+n},t.utils.isFunction=function(t){return e?e.isFunction(t):!!(t&&t.constructor&&t.call&&t.apply)},t.utils.buildQueryString=function(e,t){void 0===t&&(t=!0);var n="";function i(){n.length?n+="&":t&&(n+="?")}for(var o=0;o<e.length;++o){var a=e[o];if(void 0!==a.value)if(null===a.value&&(a.value=""),i(),a.value.toJSON&&"function"==typeof a.value.toJSON)n=n+a.name+"="+encodeURIComponent(a.value.toJSON());else if(Array.isArray(a.value)&&a.value.length)for(var r=0;r<a.value.length;r++)0<r&&i(),n=n+a.name+"["+r+"]="+encodeURIComponent(a.value[r]);else n=n+a.name+"="+encodeURIComponent(a.value)}return n},t.utils.setCookieValue=function(e,t,n,i,o){var a=encodeURIComponent(e)+"=";t&&(a+=encodeURIComponent(t)),n&&(a=a+"; expires="+n.toUTCString()),i&&(a=a+"; path="+i),o&&(a=a+"; domain="+o),document.cookie=a},t.utils.getCookieValue=function(e){for(var t=document.cookie.split("; "),n=0;n<t.length;n++)if(t[n]){var i=t[n].split("=");if(2==i.length&&decodeURIComponent(i[0])===e)return decodeURIComponent(i[1]||"")}return null},t.utils.deleteCookie=function(e,t){var n=(n=encodeURIComponent(e)+"=")+"; expires="+new Date((new Date).getTime()-864e5).toUTCString();t&&(n=n+"; path="+t),document.cookie=n},t.utils.getDomain=function(e){var t=/(https?:){0,1}\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i.exec(e);return t&&t[2]?t[2]:""}});
/**
 * `cartesian` is the runtime global merged at app boot via
 * `_.merge(cartesian, GET /v1/configurations)` (see
 * `app-initializer.service.ts` in each app).
 *
 * Per-section subtrees (e.g. `cartesian.shopifier`, `cartesian.ehr`) are NOT
 * declared in this canonical file — sections OWN their subtree types and
 * surface them via TypeScript declaration merging from their own libs. See
 * e.g. `projects/shopifier/core/src/lib/cartesian-shopifier.d.ts`.
 *
 * The pattern from a section lib:
 *
 *   // projects/<section>/core/src/lib/cartesian-<section>.d.ts
 *   declare global {
 *     namespace cartesian.<section> {
 *       let someKey: string | undefined;
 *       let someFlag: boolean | undefined;
 *     }
 *   }
 *   export {};
 *
 * Typing is intentionally GENERIC (primitive types only). Enum-typed
 * schema keys land as `string | undefined`, booleans as `boolean | undefined`.
 * Do NOT redeclare BE-owned literal unions (e.g. `'manual' | 'fefo'`) —
 * the BE Configs file (`app/Containers/<Section>/.../Configs/<file>.php`)
 * is the single source of truth for option lists. The trade-off is loss
 * of TS exhaustiveness on `switch` over a strategy value; that is
 * deliberate.
 *
 * Future evolution: a build-time generator can read the BE Configs files
 * and emit narrowed types either back into this canonical file or into a
 * generated `.d.ts` per section. Until that generator ships, augments
 * use primitive types only.
 *
 * Why typed-but-optional (`| undefined`): the BE public-bundle endpoint
 * does NOT currently read-through schema defaults — a tenant that has
 * never saved any section config will have `cartesian.<section>`
 * undefined entirely (the `_.merge` simply didn't write that subtree).
 * Consumers should use optional chaining + a default:
 *
 *   const strategy = cartesian.shopifier?.posBatchStrategy ?? 'manual';
 *
 * Sections without an augment file still WORK at runtime; consumers
 * just cast `(cartesian as any).newSection` at the read site.
 */
declare namespace cartesian {
  let appPath: string;

  let pageLoadTime: Date;

  function toAbsAppPath(path: string): string;

  namespace tenancy {
    /**
     * Numeric codes for the active tenancy context. Mirrors the backend's
     * `tenancy.context` config block. `cartesian.session.context` holds
     * one of these values.
     */
    enum context {
      TENANT = 1,
      HOST = 2,
    }

    let isEnabled: boolean;

    let ignoreFeatureCheckForHostUsers: boolean;

    let tenantIdCookieName: string;

    function setTenantIdCookie(tenantId?: string): void;

    function getTenantIdCookie(): string;
  }

  interface ISession {

    /** Authenticated user id. Populated by UserConfigurationProcessor::preServe (`user_id`). */
    readonly userId?: string;

    /** Current tenant id. Populated by TenantConfigurationProcessor::preServe (`tenant_id`). */
    readonly tenantId?: string;

    /** Current domain id. Populated by DomainConfigurationProcessor::preServe (`domain_id`). */
    readonly domainId?: string;

    /** True when running inside the host tenant context. */
    readonly isHost?: boolean;

    /** True when the authenticated user has the admin role. */
    readonly isAdmin?: boolean;

    /**
     * Numeric tenancy context code (1=TENANT, 2=HOST). Mirrors the
     * backend `session.context` field. See `cartesian.tenancy.context`.
     */
    readonly context?: tenancy.context;

    readonly impersonatorUserId?: string;

    readonly impersonatorTenantId?: string;

    isHostAdmin(): boolean;
    isTenantAdmin(): boolean;
    isUserLogged(): boolean;
    isHostSide(): boolean;
    isTenantSide(): boolean;

  }

  let session: ISession;

  /**
   * Canonical ISO 4217 code in which all `decimal` amounts are persisted
   * across the installation. Set once at install via env
   * (`CARTESIAN_STORAGE_CURRENCY`) and never changes — re-denominating
   * existing stored amounts is out of scope of the localization workstream.
   *
   * Distinct from `cartesian.regional.currency` (per-tenant DISPLAY
   * currency only — same number, different symbol).
   */
  let storageCurrency: string;

  interface IDateFormat {
    /** Compact form for listing columns, badges. e.g. `'dd/MM/yyyy'`. */
    short?: string;
    /** Form inputs, detail views. e.g. `'dd MMM yyyy'`. */
    medium?: string;
    /** Headers, reports, formal documents. e.g. `'EEEE, dd MMMM yyyy'`. */
    long?: string;
  }

  interface IRegionalInfo {
    /** IANA time-zone identifier, e.g. `'Asia/Karachi'`. */
    timeZone?: string;

    /** BCP 47 locale tag, e.g. `'en-PK'`. Drives Intl.NumberFormat / Intl.DateTimeFormat. */
    locale?: string;

    /** Date-format patterns for short / medium / long display. */
    dateFormat?: IDateFormat;

    /**
     * Display-only currency code (ISO 4217). DOES NOT alter stored amounts
     * or perform FX conversion. Storage currency lives at top-level
     * `cartesian.storageCurrency` and is install-wide.
     *
     * Tenant-only at config layer (user-scope cannot override — see
     * localization workstream D2).
     */
    currency?: string;
  }

  /**
   * Resolved formatting / locale / timezone preferences for the current
   * session. Populated by the `regional` schema section in tenant + user
   * scopes (user overrides tenant where applicable; currency is tenant-only).
   * BE serves the merged tree under the top-level `regional` key in
   * `/v1/configurations`; FE app-initializer's snake→camel converter lands
   * it as `cartesian.regional.*`.
   *
   * Consumers should prefer `RegionalService` for read access — gives
   * sensible fallbacks when the bundle hasn't loaded yet (early app boot,
   * unauth contexts).
   */
  let regional: IRegionalInfo;

  namespace localization {
    interface ILanguageInfo {
      name: string;
      displayName: string;
      icon: string;
      isDefault: boolean;
      isDisabled: boolean;
    }

    interface ILocalizationSource {
      name: string;
      type: string;
    }

    let languages: ILanguageInfo[];

    let currentLanguage: ILanguageInfo;

    let sources: ILocalizationSource[];

    let defaultSourceName: string;

    let values: { [key: string]: string };

    let web: (key: string) => string;

    function localize(key: string, sourceName: string): string;

    function getSource(sourceName: string): (...key: string[]) => string;

    function isCurrentCulture(name: string): boolean;
  }

  namespace auth {
    let allPermissions: { [name: string]: boolean };

    let grantedPermissions: { [name: string]: boolean };

    let assignedRoles: string[];

    function isGranted(permissionName: string): boolean;

    function isAnyGranted(...args: string[]): boolean;

    function areAllGranted(...args: string[]): boolean;

    /**
     * Check if the current user has a specific role
     * @param roleName The role name to check
     * @returns True if the user has the role, false otherwise
     */
    function hasRole(roleName: string): boolean;

    /**
     * Check if the current user has any of the specified roles
     * @param roleNames Role names to check
     * @returns True if the user has at least one of the roles, false otherwise
     */
    function hasAnyRole(...roleNames: string[]): boolean;

    /**
     * Check if the current user has all of the specified roles
     * @param roleNames Role names to check
     * @returns True if the user has all of the roles, false otherwise
     */
    function hasAllRoles(...roleNames: string[]): boolean;

    let tokenCookieName: string;

    /**
     * Saves auth token.
     * @param authToken The token to be saved.
     * @param expireDate Optional expire date. If not specified, token will be deleted at end of the session.
     */
    function setToken(authToken: string, expireDate?: Date): void;

    function getToken(): string;

    function clearToken(): void;

    let refreshTokenCookieName: string;

    /**
     * Saves refreshToken token.
     * @param refreshToken The token to be saved.
     * @param expireDate Optional expire date. If not specified, token will be deleted at end of the session.
     */
    function setRefreshToken(refreshToken: string, expireDate?: Date): void;

    function getRefreshToken(): string;

    function clearRefreshToken(): void;
  }

  namespace features {
    interface IFeature {
      value: string;
    }

    let allFeatures: { [name: string]: IFeature };

    function get(name: string): IFeature;

    function getValue(name: string): string;

    function isEnabled(name: string): boolean;
  }

  namespace setting {
    let values: { [name: string]: string };

    function get(name: string): string;

    function getBoolean(name: string): boolean;

    function getInt(name: string): number;

    enum settingScopes {
      Application = 1,

      Tenant = 2,

      User = 4,
    }
  }

  namespace nav {
    interface IMenu {
      name: string;
      displayName?: string;
      customData?: any;
      items: IMenuItem[];
    }

    interface IMenuItem {
      name: string;
      order: number;
      displayName?: string;
      icon?: string;
      url?: string;
      customData?: any;
      items: IMenuItem[];
    }

    let menus: { [name: string]: IMenu };
  }

  namespace notifications {
    enum severity {
      INFO,
      SUCCESS,
      WARN,
      ERROR,
      FATAL,
    }

    enum userNotificationState {
      UNREAD,
      READ,
    }

    //TODO: We can extend this interface to define built-in notification types, like ILocalizableMessageNotificationData
    interface INotificationData {
      type: string;

      properties: any;
    }

    interface INotification {
      id: string;
      notificationName: string;
      severity: severity;
      entityType?: any;
      entityTypeName?: string;
      entityId?: any;
      data: INotificationData;
      creationTime: Date;
    }

    interface IUserNotification {
      id: string;
      userId: number;
      state: userNotificationState;
      notification: INotification;
    }

    let messageFormatters: any;

    function getUserNotificationStateAsString(
      userNotificationState: userNotificationState
    ): string;

    function getUiNotifyFuncBySeverity(
      severity: severity
    ): (message: string, title?: string, options?: any) => void;

    function getFormattedMessageFromUserNotification(
      userNotification: IUserNotification
    ): string;

    function showUiNotifyForUserNotification(
      userNotification: IUserNotification,
      options?: any
    ): void;
  }

  namespace log {
    enum levels {
      DEBUG,
      INFO,
      WARN,
      ERROR,
      FATAL,
    }

    let level: levels;

    function log(logObject?: any, logLevel?: levels): void;

    function debug(logObject?: any): void;

    function info(logObject?: any): void;

    function warn(logObject?: any): void;

    function error(logObject?: any): void;

    function fatal(logObject?: any): void;
  }

  namespace notify {
    function info(message: string, title?: string, options?: any): void;

    function success(message: string, title?: string, options?: any): void;

    function warn(message: string, title?: string, options?: any): void;

    function error(message: string, title?: string, options?: any): void;
  }

  namespace message {
    //TODO: these methods return jQuery.Promise instead of any. fix it.

    function info(message: string, title?: string, options?: any): any;

    function success(message: string, title?: string, options?: any): any;

    function warn(message: string, title?: string, options?: any): any;

    function error(message: string, title?: string, options?: any): any;

    function confirm(
      message: string,
      title?: string,
      callback?: (result: boolean) => void,
      isHtml?: boolean,
      options?: any
    ): any;
  }

  namespace ui {
    interface ILoaderConfig {
      type?: 'css' | 'image' | 'icon';
      cssClass?: string;
      image?: string | null;
      /** Icon-font class string (e.g. `'fa fa-circle-notch fa-spin fa-3x'`). Used when `type='icon'`. */
      icon?: string | null;
      text?: string;
      showText?: boolean;
      backdrop?: 'blur' | 'opacity' | 'none';
      backdropColor?: string;
    }

    interface IConfig {
      loader?: ILoaderConfig;
    }

    let config: IConfig;

    function configure(options: IConfig): void;

    function block(elm?: any): void;

    function unblock(elm?: any): void;

    function setBusy(elm?: any, text?: any, delay?: any): void;

    function clearBusy(elm?: any, delay?: any): void;
  }

  namespace event {
    function on(eventName: string, callback: (...args: any[]) => void): void;

    function off(eventName: string, callback: (...args: any[]) => void): void;

    function trigger(eventName: string, ...args: any[]): void;
  }

  interface INameValue {
    name: string;
    value?: any;
  }

  namespace utils {
    function createNamespace(root: any, ns: string): any;

    function replaceAll(str: string, search: string, replacement: any): string;

    function formatString(str: string, ...args: any[]): string;

    function toPascalCase(str: string): string;

    function toCamelCase(str: string): string;

    function truncateString(str: string, maxLength: number): string;

    function truncateStringWithPostfix(
      str: string,
      maxLength: number,
      postfix?: string
    ): string;

    function isFunction(obj: any): boolean;

    function buildQueryString(
      parameterInfos: INameValue[],
      includeQuestionMark?: boolean
    ): string;

    /**
     * Sets a cookie value for given key.
     * This is a simple implementation created to be used by Cartesian.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @param {string} value
     * @param {Date} expireDate (optional). If not specified the cookie will expire at the end of session.
     * @param {string} path (optional)
     */
    function setCookieValue(
      key: string,
      value: string,
      expireDate?: Date,
      path?: string
    ): void;

    /**
     * Gets a cookie with given key.
     * This is a simple implementation created to be used by Cartesian.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @returns {string} Cookie value or null
     */
    function getCookieValue(key: string): string;

    /**
     * Deletes cookie for given key.
     * This is a simple implementation created to be used by Cartesian.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @param {string} path (optional)
     */
    function deleteCookie(key: string, path?: string): void;
  }

  namespace security {
    namespace antiForgery {
      let tokenCookieName: string;

      let tokenHeaderName: string;

      function getToken(): string;
    }
  }
}


import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
  RouteMeta
} from "vue-router";

import { LOCAT_STRAGE_FIELDS }      from "@/enums/constants.enums";
import MemberAuthManagerUtil        from "@ui/version_2/utils/member_auth_manager_util";
import GlobalVariableManager        from "@ui/version_1/Resources/global_variable_manager_util";

const LoginView                 = () => import("@/modules/auth_module/views/login_view/login_view.vue");
const TwoFactorLoginView        = () => import("@/modules/auth_module/views/two_factor_login_view/two_factor_login_view.vue");
// const LogoutView                = () => import("@/modules/auth_module/views/logout_view.vue");
const DashboardView             = () => import("@/modules/dashboard_module/views/main_dashboard_view/main_dashboard_view.vue");
// const RegisteredAppsView        = () => import("@/modules/registered_app_module/views/registered_apps_view.vue");
// const DatasourceView            = () => import("@/modules/datasource_module/views/list_view_ui.vue");
// const SchemaView                = () => import("@/modules/schema_module/views/schemas_view.vue");
// const AppSchemaView             = () => import("@/modules/app_schema_module/views/app_schemas_view.vue");
// const MemberView                = () => import("@/modules/member_module/views/members_view.vue");

class RouterManager {
    public readonly name = "router_manager";
    private routes: RouteRecordRaw[];
    private router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    private global_vars: GlobalVariableManager

    constructor() {
        this.routes                     = this.getRoutes();
        this.router                     = this.createRouter();
        this.member_auth_manager        = new MemberAuthManagerUtil();
        this.global_vars                = GlobalVariableManager.getInstance();

        this.setupRouterGuards();
    }

    // Method to create the router instance
    private createRouter (): Router  {
        return createRouter({ history: createWebHistory("/"), routes: this.routes });
    }

    // Method to set up route gaurds
    private setupRouterGuards (): void {
        this.router.beforeEach(async (to, from, next) => {
            const route = this.routes.find((el) => el.name === to.name);

            if (!route) {
                console.warn("Route not found, redirecting back...");
                return next(from.fullPath);
            }

            const global_vars   = GlobalVariableManager.getInstance();
            global_vars.setVariable("CURRENT_PAGE_ID", route.name)

            const {
                title_key,
                permission_name = "" as string,
                requires_no_auth = false,
                requires_full_auth = false,
                requires_partial_auth = false
            } = (route.meta || {}) as RouteMeta;

            const has_permission                = this.member_auth_manager.canMemberAccess(permission_name, LOCAT_STRAGE_FIELDS.MEMBER_PERMISSIONS);
            const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STRAGE_FIELDS.MEMBER);
            const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STRAGE_FIELDS.MEMBER);
            const is_not_authenticated          = (is_fully_authenticated === false && is_partially_authenticated === false);

            // 🚦 Handle no-auth routes
            if (requires_no_auth) {
                if (is_not_authenticated) { return next(); }

                if (is_partially_authenticated) { return next("/two-factor-login"); }

                if (is_fully_authenticated) { return next("/dashboard"); }
            }

            // 🚦 Handle partial-auth routes
            if (requires_partial_auth) {
                if (is_partially_authenticated) { return next(); }

                return next("/login");
            }

            // 🚦 Handle full-auth routes
            if (requires_full_auth) {
                if (!is_fully_authenticated) { return next("/login"); }
                // check permission if required
                if (permission_name && !has_permission) { return next("/unauthorized"); }
                return next();
            }

            return next();
        });
    }

    // Method to get routes array
    private getRoutes (): RouteRecordRaw[] {
        return [
            { 
                path: "/", 
                name: "Home", 
                component: LoginView,
                meta: {
                    title_key: "home-page",
                    permission_name: "", 
                    requires_no_auth: true
                }
            },
            { 
                path: "/login", 
                name: "Login", 
                component: LoginView,
                meta: {
                    title_key: "login-page",
                    permission_name: "member_login", 
                    requires_no_auth_true: true
                }
            },
            { 
                path: "/two-factor-login", 
                name: "TwoFactorLogin", 
                component: TwoFactorLoginView,
                meta: {
                    title_key: "two-factor-login-page", 
                    permission_name: "member_2fa_login", 
                    requires_partial_auth: true,
                }
            },
        //     { 
        //         path: "/logout", 
        //         name: "Logout", 
        //         component: LogoutView, 
        //         meta: {
        //             title_key: "logout-page", 
        //             permission_name: "member_logout",
        //             requires_full_auth: true 
        //         }
        //     },
            { 
                path: "/dashboard", 
                name: "Dashboard", 
                component: DashboardView,
                meta: {
                    title_key: "dashboard-page", 
                    permission_name: "", 
                    requires_full_auth: true,
                }
            },

        //     { 
        //         path: "/registered-apps", 
        //         name: "RegisteredAppsView", 
        //         component: RegisteredAppsView,
        //         meta: {
        //             title_key: "registered-app-page", 
        //             permission_name: "view_all_registered_apps" , 
        //             requires_full_auth: true
        //         }
        //      },

        //     { 
        //         path: "/datasources", 
        //         name: "DatasourceView", 
        //         component: DatasourceView, 
        //         meta: {
        //             title_key: "datasource-page", 
        //             permission_name: "view_all_datasources" , 
        //             requires_full_auth: true
        //         }
        //     },

        //     { 
        //         path: "/schemas",  
        //         name: "SchemaView", 
        //         component: SchemaView, 
        //         meta: {
        //             title_key: "schema-page",
        //             permission_name: "view_all_fiberx_dbms_schemas" , 
        //             requires_full_auth: true
        //         }
        //     },

        //     { 
        //         path: "/app-schemas", 
        //         name: "AppSchemaView", 
        //         component: AppSchemaView, 
        //         meta: {
        //             title_key: "app-schema-page",
        //             permission_name: "view_app_schema_access" , 
        //             requires_full_auth: true
        //         }
        //     },

        //     { 
        //         path: "/members", 
        //         name: "MemberView", 
        //         component: MemberView,
        //         meta: {
        //             title_key: "members-page",
        //             permission_name: "view_members", 
        //             requires_full_auth: true
        //         }
        //     }
 
        ];
    }

    // Method to expose router so it can be used in main.ts
    public getRouter(): Router { return this.router; }

}

export default RouterManager;
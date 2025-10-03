
import "vue-router";

declare module "vue-router" {
  export interface RouteMeta {
    title_key?: string;
    permission_name?: string;
    requires_no_auth?: boolean;
    requires_full_auth?: boolean;
    requires_partial_auth?: boolean;
  }

  export interface RouteRecordRawV1 {
    path: string,
    name: string,
    component?: any;
    meta?: RouteMeta
  }
}
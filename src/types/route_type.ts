
import "vue-router";

declare module "vue-router" {
  export interface RouteMeta {
    title_key?: string;
    permission_name?: string;
    requires_no_auth?: boolean;
    requires_full_auth?: boolean;
    requires_partial_auth?: boolean;
  }
}
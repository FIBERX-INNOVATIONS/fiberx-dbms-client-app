// src/main.ts
import { createApp, App as VueApp } from "vue";
import { Router } from "vue-router";

import GlobalVariableManager        from "@ui/version_1/Resources/global_variable_manager_util";
import LoggerUtil                   from "@ui/version_2/utils/logger_util";
import ENVManagerUtil               from "@ui/version_2/utils/env_manager_util";
import ContentManagerUtil           from "@ui/version_2/utils/content_manager_util";
import AppRootComponent             from "@/modules/app_root_module/app_root.vue";
import RouterManager                from "@/router";

import { ENVInterface }             from "@ui/version_2/types/env_type";



class FiberxDbmsClientApp {
    public name = "fiberx_dbms_client_app";
    private vue_app: VueApp;
    private app_component: any;
    private readonly ENV: ENVInterface;
    private global_vars: GlobalVariableManager;
    private content_manager: ContentManagerUtil;
    private logger: LoggerUtil;
    private router: Router;

    constructor(app_component: any) {
        this.app_component      = app_component;
        this.vue_app            = createApp(this.app_component);

        this.global_vars        = GlobalVariableManager.getInstance();
        this.content_manager    = ContentManagerUtil.getInstance();
        this.router             = new RouterManager().getRouter();
        this.logger             = new LoggerUtil({ prefix: this.name, show_timestamp: false })
        this.ENV                = new ENVManagerUtil().env_data;
        
    }

    // Method to get app content_data
    private async getAppContentData(): Promise<void> {
        const app_content_data_url      = this.ENV?.VITE_APP_CONTENT_DATA_URL;

        if(app_content_data_url) { 
            await this.content_manager.load(app_content_data_url, "content_resource"); 
            this.content_manager.mergeAllAPIResponsesObjects();
        }
    }

    // Method to handle app error
    private handleAppError (err: unknown, instance: Record<string, any> | null, info: string): void {
        this.logger.error("[Vue Global Error]", err);
        this.logger.error("[Error Info]:", info);

        if (instance) {
            this.logger.error("Component:", instance.$options?.__name || instance?.type?.name || "Anonymous");
        }
    }

    // Method to initialize global properties
    private initializeAppGlobalProperties (): void {
        this.vue_app.config.globalProperties.$ENV = this.ENV;
        
        // 🔥 Add error handler immediately after app is created
        this.vue_app.config.errorHandler = this.handleAppError.bind(this)
    }

    // Method to mount root app component
    public  async mountApp (selector: string): Promise<void> {
        await this.getAppContentData();

        this.initializeAppGlobalProperties();

        // this.vue_app.use(this.router);
        this.vue_app.mount(selector);
    }
}

// Create and mount the Vue app
const main = async () => {
    const vueApp = new FiberxDbmsClientApp(AppRootComponent);
    await vueApp.mountApp("#app");
};

main();


import { defineConfig }         from "vite";
import vue                      from "@vitejs/plugin-vue";
import { fileURLToPath, URL }   from "node:url";
import tailwindcss              from "@tailwindcss/vite"


export default defineConfig({
    // Set the root to the store app folder
    root: "./",

    base: "/",

    mode: "development",

    define: { __APP_VERSION__: JSON.stringify("v2.0.1"), },

    plugins: [vue(), tailwindcss()],

    publicDir: "./public/",

    resolve: {
        alias: { 
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@ui": fileURLToPath(new URL("../fi-ui-toolkit", import.meta.url)),
        }
    },
    appType: "spa",

    build: {
        outDir: "./dist",

        rollupOptions: { input: "./index.html" }
    },
    optimizeDeps: {  
        include: []
        // include: ['src/**/*.vue', "../fi-ui-toolkit/**/*.vue"] 
    },

    server: {
        port: Number(5172),
        strictPort: true,
        open: true, 
        historyApiFallback: true
    }
});
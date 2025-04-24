import { reactRouter } from "@react-router/dev/vite";
// import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import { flatRoutes } from 'remix-flat-routes';

// installGlobals();
declare module "@remix-run/node" {
  // or cloudflare, deno, etc.
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [reactRouter(), tsconfigPaths()],

  // build: {
  //   rollupOptions: {
  //     external: ['@tippyjs/react/headless'],
  //   }
  // }

  server: {
    allowedHosts: mode === "development" ? ["localhost", "host.docker.internal"] : [],
  }
}));

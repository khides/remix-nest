// import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // app routes
  index("routes/_index.tsx"),
] satisfies RouteConfig;


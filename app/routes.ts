import { type RouteConfig, route, layout } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
  layout("layouts/MainLayout.tsx", [
    route("/", "pages/Inventory.tsx"),
    route("/classification", "pages/Classification.tsx")
  ]),

  ...(await flatRoutes()),
] satisfies RouteConfig;

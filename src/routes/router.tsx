import { createBrowserRouter } from "react-router";
import { SiteLayout } from "../layouts/SiteLayout";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      {
        index: true,
        lazy: () => import("../pages/Home").then((mod) => ({ Component: mod.default })),
      },
      {
        path: "work",
        lazy: () => import("../pages/Work").then((mod) => ({ Component: mod.default })),
      },
      {
        path: "photography",
        lazy: () => import("../pages/Photography").then((mod) => ({ Component: mod.default })),
      },
      {
        path: "films",
        lazy: () => import("../pages/Films").then((mod) => ({ Component: mod.default })),
      },
      {
        path: "client",
        lazy: () => import("../pages/ClientWork").then((mod) => ({ Component: mod.default })),
      },
      {
        path: "work/:slug",
        lazy: () => import("../pages/Project").then((mod) => ({ Component: mod.default })),
      },
      {
        path: "about",
        lazy: () => import("../pages/About").then((mod) => ({ Component: mod.default })),
      },
      {
        path: "contact",
        lazy: () => import("../pages/Contact").then((mod) => ({ Component: mod.default })),
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

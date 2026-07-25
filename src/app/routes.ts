import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { WhiskerHavenPage } from "./pages/WhiskerHavenPage";
import { StarmoryPage } from "./pages/StarmoryPage";
import { SteamRedesignPage } from "./pages/SteamRedesignPage";
import { TerramonPage } from "./pages/TerramonPage";
import { BingChillingPage } from "./pages/BingChillingPage";
import { HealthyTastePage } from "./pages/HealthyTastePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "whisker-haven", Component: WhiskerHavenPage },
      { path: "starmory", Component: StarmoryPage },
      { path: "steam-redesign", Component: SteamRedesignPage },
      { path: "terramon", Component: TerramonPage },
      { path: "bingchilling", Component: BingChillingPage },
      { path: "healthy-taste", Component: HealthyTastePage },
      { path: ":slug", Component: CaseStudyPage },
    ],
  },
]);

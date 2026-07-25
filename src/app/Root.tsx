import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ScrollButtons } from "./components/ScrollButtons";

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ fontFamily: "var(--font-sans)", overflowX: "hidden" }}>
      <Navbar />
      <Outlet />
      <ScrollButtons />
    </div>
  );
}

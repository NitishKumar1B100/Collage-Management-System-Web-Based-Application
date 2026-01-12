import { Outlet } from "react-router-dom";
import { ThemeCustomeHook } from "../../context/Theme/ThemeCustomeHook";

function Layout() {
  const { theme } = ThemeCustomeHook();

  return (
    <div className={theme}>
      <Outlet />
    </div>
  );
}

export default Layout;

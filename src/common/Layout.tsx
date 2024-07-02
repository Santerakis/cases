import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <header></header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

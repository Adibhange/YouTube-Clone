import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <SideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;

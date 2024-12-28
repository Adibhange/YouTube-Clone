import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

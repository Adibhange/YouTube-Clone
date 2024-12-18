import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: ,
    children: [{ index: true, element: <Home /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
);

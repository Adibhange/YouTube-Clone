import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import VideoDetails from "./pages/VideoDetails";
import ChannelDetails from "./pages/ChannelDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateChannel from "./pages/CreateChannel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: ,
    children: [
      { index: true, element: <Home /> },
      { path: "video/:id", element: <VideoDetails /> },
      { path: "channel/:id", element: <ChannelDetails /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "create-channel", element: <CreateChannel /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
);

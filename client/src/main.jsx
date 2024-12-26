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
import Loader from "./components/Loader.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import UserChannel from "./pages/UserChannel.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "video/:id", element: <VideoDetails /> },
      { path: "channel/:id", element: <ChannelDetails /> },
      { path: "user-channel", element: <UserChannel /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "create-channel", element: <CreateChannel /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
);

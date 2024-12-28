import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoutes";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const VideoDetails = lazy(() => import("./pages/VideoDetails"));
const ChannelDetails = lazy(() => import("./pages/ChannelDetails"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const CreateChannel = lazy(() => import("./pages/CreateChannel"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const UserChannel = lazy(() => import("./pages/UserChannel"));
const EditChannel = lazy(() => import("./pages/EditChannel"));
const SearchedVideo = lazy(() => import("./pages/SearchedVideo"));
const UploadVideo = lazy(() => import("./pages/UploadVideo"));
const UpdateVideo = lazy(() => import("./pages/UpdateVideo"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "video/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <VideoDetails />
          </Suspense>
        ),
      },
      {
        path: "channel/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ChannelDetails />
          </Suspense>
        ),
      },
      {
        path: "search/:query",
        element: (
          <Suspense fallback={<Loader />}>
            <SearchedVideo />
          </Suspense>
        ),
      },
      {
        path: "sign-in",
        element: (
          <Suspense fallback={<Loader />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "sign-up",
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "user-channel",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <UserChannel />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "create-channel",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <CreateChannel />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-Channel",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <EditChannel />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "upload-video",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <UploadVideo />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "video/edit/:videoId",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <UpdateVideo />
            </Suspense>
          </PrivateRoute>
        ),
      },
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

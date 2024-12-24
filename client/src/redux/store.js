import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../redux/slices/sidebarSlice";
import userSlice from "../redux/slices/userSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    user: userSlice,
  },
});

export default store;

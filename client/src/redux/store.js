import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../redux/slices/sidebarSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
  },
});

export default store;

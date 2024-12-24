import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action for starting the request
    requestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Action for successful sign-in
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // Action for successful sign-out
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },

    // Action for handling errors
    requestFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Store error message
    },
  },
});

export const { requestStart, signInSuccess, signOutSuccess, requestFailure } =
  userSlice.actions;

export default userSlice.reducer;

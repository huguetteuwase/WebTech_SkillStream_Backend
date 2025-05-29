import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    successMessage: "",
    error: null,
    user: null,
  },
  reducers: {
    clearLoginError: (state) => {
      state.error = null;
    },
    clearLoginSuccess: (state) => {
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(apis.login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = "";
    });
    builder.addCase(apis.login.fulfilled, (state, action) => {
      state.loading = false;
      
      // Check if it's a verification code message or actual user data
      if (typeof action.payload === 'string' && action.payload.includes('Verification code sent')) {
        state.successMessage = action.payload;
      } else if (action.payload && typeof action.payload === 'object') {
        // Store user data but don't save to localStorage here (component will handle it)
        state.user = action.payload;
        state.successMessage = "Logged in successfully";
      }
    });
    builder.addCase(apis.login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error?.message || "Login failed";
      state.user = null;
    });
    builder.addCase(apis.resetAll, (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.successMessage = "";
    });
  },
});

export const { clearLoginError, clearLoginSuccess } = loginSlice.actions;
export default loginSlice.reducer;
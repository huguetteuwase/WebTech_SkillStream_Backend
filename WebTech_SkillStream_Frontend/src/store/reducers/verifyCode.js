import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const verifyCodeSlice = createSlice({
  name: "verifyCode",
  initialState: {
    loading: false,
    successMessage: "",
    error: null,
    user: null,
  },
  reducers: {
    clearVerifyError: (state) => {
      state.error = null;
    },
    clearVerifySuccess: (state) => {
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(apis.verifyCode.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = "";
    });
    builder.addCase(apis.verifyCode.fulfilled, (state, action) => {
      state.loading = false;
      
      // Handle different response types
      if (typeof action.payload === 'string') {
        // Success message
        state.successMessage = action.payload;
        // You might want to set a basic user object here if needed
      } else if (action.payload && typeof action.payload === 'object') {
        // User object returned
        state.user = action.payload;
        state.successMessage = "Code verified successfully";
      }
    });
    builder.addCase(apis.verifyCode.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error?.message || "Verification failed";
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

export const { clearVerifyError, clearVerifySuccess } = verifyCodeSlice.actions;
export default verifyCodeSlice.reducer;
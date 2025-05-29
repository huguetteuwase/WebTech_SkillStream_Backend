import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const createEnrollmentSlice = createSlice({
  name: "createEnrollment",
  initialState: {
    loading: false,
    message: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.createEnrollment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.createEnrollment.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload;
    });
    builder.addCase(apis.createEnrollment.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    });
    builder.addCase(apis.resetAll, (state) => {
      state.loading = false;
      state.error = "";
      state.message = "";
    });
  },
});

export default createEnrollmentSlice.reducer;

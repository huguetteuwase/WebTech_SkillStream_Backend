import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const deletecourseSlice = createSlice({
  name: "deletecourse",
  initialState: {
    loading: false,
    message: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.deletecourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.deletecourse.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload;
    });
    builder.addCase(apis.deletecourse.rejected, (state, action) => {
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

export default deletecourseSlice.reducer;

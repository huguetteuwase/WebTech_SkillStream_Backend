import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const createCourseSlice = createSlice({
  name: "createCourse",
  initialState: {
    loading: false,
    message: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.createCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.createCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload;
    });
    builder.addCase(apis.createCourse.rejected, (state, action) => {
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

export default createCourseSlice.reducer;

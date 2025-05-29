import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const updateCourseSlice = createSlice({
  name: "updateCourse",
  initialState: {
    loading: false,
    message: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.updateCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.updateCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload;
    });
    builder.addCase(apis.updateCourse.rejected, (state, action) => {
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

export default updateCourseSlice.reducer;

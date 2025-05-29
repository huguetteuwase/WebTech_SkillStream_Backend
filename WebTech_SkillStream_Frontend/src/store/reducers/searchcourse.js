import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const searchcourseSlice = createSlice({
  name: "searchcourse",
  initialState: {
    loading: false,
    successMessage: "",
    error: "",
    course: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.searchcourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.searchcourse.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action?.payload;
      state.successMessage = "Course fetched successfully";
    });
    builder.addCase(apis.searchcourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    });
  },
});

export default searchcourseSlice.reducer;

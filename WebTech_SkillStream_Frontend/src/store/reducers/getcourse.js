import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const getcourseSlice = createSlice({
  name: "getcourse",
  initialState: {
    loading: false,
    successMessage: "",
    error: "",
    course: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.getcourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.getcourse.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action?.payload;
      state.successMessage = "Course fetched successfully";
    });
    builder.addCase(apis.getcourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    });
  },
});

export default getcourseSlice.reducer;

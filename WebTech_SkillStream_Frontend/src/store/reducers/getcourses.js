import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const getcoursesSlice = createSlice({
  name: "getcourses",
  initialState: {
    loading: false,
    successMessage: "",
    error: "",
    courses: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.getcourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.getcourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action?.payload;
      state.successMessage = "Courses fetched successfully";
    });
    builder.addCase(apis.getcourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    });
  },
});

export default getcoursesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../../apis";

const getUsersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    successMessage: "",
    error: "",
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.getusers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.getusers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action?.payload;
      state.successMessage = "User fetched successfully";
    });
    builder.addCase(apis.getusers.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    });
  },
});

export default getUsersSlice.reducer;

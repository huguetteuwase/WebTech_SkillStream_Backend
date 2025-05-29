import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: {
    loading: false,
    message: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload;
    });
    builder.addCase(apis.deleteUser.rejected, (state, action) => {
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

export default deleteUserSlice.reducer;

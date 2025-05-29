import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../../apis";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    message: "",
    error: "",
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.register.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "User registered successfully";
      state.user = action?.payload;
    });
    builder.addCase(apis.register.rejected, (state, action) => {
      console.log(action?.payload, "action payload register");
      state.loading = false;
      state.error = action?.payload?.error;
    });
    builder.addCase(apis.resetAll, (state) => {
      state.loading = false;
      state.error = "";
      state.message = "";
      state.user = {};
    });
  },
});

export default registerSlice.reducer;

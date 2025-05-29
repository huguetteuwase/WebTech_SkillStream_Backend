import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "axios";

// Axios instance with base URL and headers
const axios = axiosInstance.create({
  baseURL: "http://localhost:8080", // <<== IMPORTANT: Ensure this matches your backend server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a single class/object to hold all your API thunks and reset actions
// This provides a clean way to export and use them.
class ApisService {
  // Global reset action for all slices
  resetAll = createAction("resetAll");

  // User APIs
  getusers = createAsyncThunk(
    "/admin/users",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/admin/users");
        return response.data;
      } catch (error) {
        console.error("Error in getusers:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch users.");
      }
    }
  );

  register = createAsyncThunk("/register", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", { ...data });
      return response.data;
    } catch (error) {
      console.error("Error in register:", error);
      return rejectWithValue(error.response?.data?.message || "Registration failed.");
    }
  });

  login = createAsyncThunk("/login", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", { ...data });
      return response.data;
    } catch (error) {
      console.error("Error in login:", error);
      return rejectWithValue(error.response?.data?.message || "Login failed.");
    }
  });

  // Example: Add verify email if your login requires it
  verifyCode = createAsyncThunk(
    "/verify-email",
    async ({ email, code }, { rejectWithValue }) => {
      try {
        const response = await axios.post("/verify-email", { email, code });
        return response.data;
      } catch (error) {
        console.error("Error in verifyCode:", error);
        return rejectWithValue(error.response?.data?.message || "Email verification failed.");
      }
    }
  );


  deleteUser = createAsyncThunk(
    "/admin/users/delete", // Name the thunk based on its action
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`/admin/users/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error in deleteUser:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete user.");
      }
    }
  );

  // ===== MODIFIED PASSWORD RESET APIS =====
  sendPasswordResetOTP = createAsyncThunk(
    "/forgot-password/send-otp", // Good practice to be explicit with endpoint names
    async ({ email }, { rejectWithValue }) => { // Expect an object with email
      try {
        const response = await axios.post("/forgot-password", { email }); // Backend route you specified
        return response.data; // Backend should send a success message here
      } catch (error) {
        console.error("Error in sendPasswordResetOTP:", error);
        // Ensure you return the message from the backend if available
        return rejectWithValue(error.response?.data?.message || "Failed to send OTP.");
      }
    }
  );

  verifyPasswordResetOTP = createAsyncThunk(
    "/forgot-password/verify-otp", // Explicit endpoint name
    async ({ email, code }, { rejectWithValue }) => {
      try {
        const response = await axios.post("/verify-password-otp", { email, code }); // Backend route you specified
        return response.data;
      } catch (error) {
        console.error("Error in verifyPasswordResetOTP:", error);
        return rejectWithValue(error.response?.data?.message || "Invalid or expired OTP.");
      }
    }
  );

  resetPassword = createAsyncThunk(
    "/reset-password/confirm", // Explicit endpoint name
    async ({ email, code, newPassword }, { rejectWithValue }) => {
      try {
        const response = await axios.post("/reset-password", {
          email,
          code,
          newPassword
        }); // Backend route you specified
        return response.data;
      } catch (error) {
        console.error("Error in resetPassword:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to reset password.");
      }
    }
  );
  // ===== END OF MODIFIED PASSWORD RESET APIS =====

  // Course APIs
  getcourses = createAsyncThunk(
    "getcourses",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/courses");
        return response.data;
      } catch (error) {
        console.error("Error in getcourses:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch courses.");
      }
    }
  );

  createCourse = createAsyncThunk(
    "createCourse",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.post("/courses/register", { ...data });
        return response.data;
      } catch (error) {
        console.error("Error in createCourse:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create course.");
      }
    }
  );

  getcourse = createAsyncThunk(
    "getcourse",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/courses/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error in getcourse:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch course.");
      }
    }
  );

  deletecourse = createAsyncThunk(
    "deletecourse",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`/courses/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error in deletecourse:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete course.");
      }
    }
  );

  searchcourse = createAsyncThunk(
    "searchcourse",
    async (title, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/courses/searchByTitle/${title}`);
        return response.data;
      } catch (error) {
        console.error("Error in searchcourse:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to search courses.");
      }
    }
  );

  updateCourse = createAsyncThunk(
    "updateCourse",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`/courses/${data.id}`, { ...data });
        return response.data;
      } catch (error) {
        console.error("Error in updateCourse:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to update course.");
      }
    }
  );

  // Enrollment APIs
  getenrollments = createAsyncThunk(
    "getenrollments",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/enrollment");
        return response.data;
      } catch (error) {
        console.error("Error in getenrollments:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch enrollments.");
      }
    }
  );

  createEnrollment = createAsyncThunk(
    "createEnrollment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.post("/enrollment", { ...data });
        return response.data;
      } catch (error) {
        console.error("Error in createEnrollment:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create enrollment.");
      }
    }
  );

  getenrollment = createAsyncThunk(
    "getenrollment",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/enrollment/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error in getenrollment:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch enrollment.");
      }
    }
  );

  getenrollmentbyUser = createAsyncThunk(
    "getenrollmentbyUser",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/enrollment/user/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error in getenrollmentbyUser:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch user enrollments.");
      }
    }
  );

  getenrollmentbycourse = createAsyncThunk(
    "getenrollmentbycourse",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/enrollment/course/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error in getenrollmentbycourse:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch course enrollments.");
      }
    }
  );

  leave = createAsyncThunk(
    "leave",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`/enrollment/leave/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error in leave:", error);
        return rejectWithValue(error.response?.data?.message || "Failed to leave course.");
      }
    }
  );
}

export const apis = new ApisService();

// --- REDUX SLICES ---

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetLoginState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apis.login.pending, (state) => { // Use apis.login
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(apis.login.fulfilled, (state, action) => { // Use apis.login
        state.loading = false;
        // Check if the payload is a string (verification needed) or an object (direct login)
        if (typeof action.payload === 'string') {
          state.successMessage = action.payload;
          state.user = null; // No user object yet if verification is needed
        } else {
          state.user = action.payload;
          state.successMessage = "Login successful!";
        }
        state.error = null;
      })
      .addCase(apis.login.rejected, (state, action) => { // Use apis.login
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.user = null;
        state.successMessage = null;
      });
  },
});

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apis.register.pending, (state) => { // Use apis.register
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(apis.register.fulfilled, (state, action) => { // Use apis.register
        state.loading = false;
        state.user = action.payload;
        state.message = "Registration successful! Please check your email for verification.";
        state.error = null;
      })
      .addCase(apis.register.rejected, (state, action) => { // Use apis.register
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.user = null;
        state.message = null;
      });
  },
});

export const verifyCodeSlice = createSlice({
  name: "verifyCode",
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetVerifyCodeState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apis.verifyCode.pending, (state) => { // Use apis.verifyCode
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(apis.verifyCode.fulfilled, (state, action) => { // Use apis.verifyCode
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "Email verified successfully!";
        state.error = null;
      })
      .addCase(apis.verifyCode.rejected, (state, action) => { // Use apis.verifyCode
        state.loading = false;
        state.error = action.payload || "Verification failed";
        state.user = null;
        state.successMessage = null;
      });
  },
});

// ==== FORGOT PASSWORD SLICE ====
export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetForgotPasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(apis.sendPasswordResetOTP.pending, (state) => { // Use apis.sendPasswordResetOTP
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(apis.sendPasswordResetOTP.fulfilled, (state, action) => { // Use apis.sendPasswordResetOTP
        state.loading = false;
        state.successMessage = action.payload.message || "OTP sent successfully!"; // Assuming backend sends { message: "..." }
        state.error = null;
      })
      .addCase(apis.sendPasswordResetOTP.rejected, (state, action) => { // Use apis.sendPasswordResetOTP
        state.loading = false;
        state.error = action.payload || "Failed to send OTP.";
        state.successMessage = null;
      })
      // Verify OTP
      .addCase(apis.verifyPasswordResetOTP.pending, (state) => { // Use apis.verifyPasswordResetOTP
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(apis.verifyPasswordResetOTP.fulfilled, (state, action) => { // Use apis.verifyPasswordResetOTP
        state.loading = false;
        state.successMessage = action.payload.message || "OTP verified successfully!";
        state.error = null;
      })
      .addCase(apis.verifyPasswordResetOTP.rejected, (state, action) => { // Use apis.verifyPasswordResetOTP
        state.loading = false;
        state.error = action.payload || "Invalid or expired OTP.";
        state.successMessage = null;
      })
      // Reset Password
      .addCase(apis.resetPassword.pending, (state) => { // Use apis.resetPassword
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(apis.resetPassword.fulfilled, (state, action) => { // Use apis.resetPassword
        state.loading = false;
        state.successMessage = action.payload.message || "Password reset successfully!";
        state.error = null;
      })
      .addCase(apis.resetPassword.rejected, (state, action) => { // Use apis.resetPassword
        state.loading = false;
        state.error = action.payload || "Failed to reset password.";
        state.successMessage = null;
      });
  },
});

// Export actions for individual slice resets
export const { resetLoginState } = loginSlice.actions;
export const { resetRegisterState } = registerSlice.actions;
export const { resetVerifyCodeState } = verifyCodeSlice.actions;
export const { resetForgotPasswordState } = forgotPasswordSlice.actions;

// This combines all individual reset actions into one convenient thunk
// It's dispatched via `apis.resetAll()`
apis.resetAll = createAction("resetAll"); // Define it here to ensure it's a valid action type

// Export individual reducers
export const loginReducer = loginSlice.reducer;
export const registerReducer = registerSlice.reducer;
export const verifyCodeReducer = verifyCodeSlice.reducer;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;
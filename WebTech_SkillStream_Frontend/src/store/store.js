import { configureStore } from "@reduxjs/toolkit";
// Import all your reducers
import {
  loginReducer,
  registerReducer,
  verifyCodeReducer,
  forgotPasswordReducer, // Import the new reducer
  apis // Import the apis object itself to use its resetAll action in middleware
} from "./apis";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    verifyCode: verifyCodeReducer,
    forgotPassword: forgotPasswordReducer, // Add the new reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((store) => (next) => (action) => {
      // Listen for the global resetAll action
      if (apis.resetAll.match(action)) {
        // Dispatch individual reset actions for each slice
        store.dispatch(loginReducer.actions.resetLoginState()); // Correct way to access slice actions
        store.dispatch(registerReducer.actions.resetRegisterState());
        store.dispatch(verifyCodeReducer.actions.resetVerifyCodeState());
        store.dispatch(forgotPasswordReducer.actions.resetForgotPasswordState());
      }
      return next(action);
    }),
});
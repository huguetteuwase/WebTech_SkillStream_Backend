import { configureStore } from "@reduxjs/toolkit";
import { adminReducers } from "./reducers/admin";
import loginReducer from "./reducers/login";
import { reducers } from "./reducers";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    ...adminReducers,
    ...reducers,
  },
});

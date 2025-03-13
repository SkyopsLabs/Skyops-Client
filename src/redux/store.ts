import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import refReducer from "./slices/referralSlice";
import transactionReducer from "./slices/transactions";

export const store = configureStore({
  reducer: { user: userReducer, code: refReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

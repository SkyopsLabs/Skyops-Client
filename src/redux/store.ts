import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import refReducer from "./slices/referralSlice";
import transactionReducer from "./slices/transactions";
import leaderboardReducer from "./slices/leaderboardSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    code: refReducer,
    leaderboard: leaderboardReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

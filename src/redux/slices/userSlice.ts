import { ILeaderboard, IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: {} as IUser,
  userWithRank: {} as ILeaderboard,
  balance: 0,
};

export const section = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setUserWithRank: (state, action: PayloadAction<ILeaderboard>) => {
      state.userWithRank = action.payload;
    },
  },
});

export const { setUser, setUserWithRank, setBalance } = section.actions;
export default section.reducer;

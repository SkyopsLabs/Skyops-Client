import { ILeaderboard, IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: {} as IUser,
  userWithRank: {} as ILeaderboard,
};

export const section = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setUserWithRank: (state, action: PayloadAction<ILeaderboard>) => {
      state.userWithRank = action.payload;
    },
  },
});

export const { setUser, setUserWithRank } = section.actions;
export default section.reducer;

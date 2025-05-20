import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILeaderboard } from "@/types";
import { getAllUsers } from "@/actions/verify";

interface LeaderboardState {
  users: ILeaderboard[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchLeaderboard = createAsyncThunk<
  ILeaderboard[],
  string | undefined
>("leaderboard/fetchLeaderboard", async (undefined, { rejectWithValue }) => {
  try {
    const res = await getAllUsers();
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch leaderboard");
  }
});

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default leaderboardSlice.reducer;

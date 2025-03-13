import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Transactions = {
  activeTransaction:string
};

const initialState = {
  activeTransaction: "",
} as Transactions;

export const section = createSlice({
  name: "Transactions",
  initialState,
  reducers: {
    setActiveTransaction: (state, action: PayloadAction<string>) => {
      state.activeTransaction = action.payload;
    },
  },
});

export const { setActiveTransaction } = section.actions;
export default section.reducer;

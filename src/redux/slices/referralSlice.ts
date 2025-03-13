import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  code: "",
};

export const section = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },
});

export const { setCode } = section.actions;
export default section.reducer;

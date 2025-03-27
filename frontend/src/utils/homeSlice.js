import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: true,
  reducers: {
    homeSetting: (state, action) => {
      return action.payload;
    },
  },
});

export const { homeSetting } = homeSlice.actions;

export default homeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "edit",
  initialState: false,
  reducers: {
    editSetting: (state, action) => {
      return action.payload;
    },
  },
});

export const { editSetting } = editSlice.actions;

export default editSlice.reducer;

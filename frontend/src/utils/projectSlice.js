import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: null,
  reducers: {
    addProject: (state, action) => action.payload,
  },
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;

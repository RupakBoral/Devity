import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: null,
  reducers: {
    addProject: (state, action) => action.payload,
    updateNewProject: (state, action) => {
      const { _id, newProject } = action.payload;
      return state.map((project) =>
        project._id === _id ? { ...project, ...newProject } : project
      );
    },
    addNewProject: (state, action) => {
      state.push(action.payload);
      return state;
    },
    deleteProject: (state, action) => {
      const updatedProject = state.filter(
        (project) => project._id != action.payload
      );
      return updatedProject;
    },
  },
});

export const { addProject, updateNewProject, deleteProject, addNewProject } =
  projectSlice.actions;

export default projectSlice.reducer;

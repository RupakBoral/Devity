import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import editReducer from "./editSlice";
import homeReducer from "./homeSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import projectReducer from "./projectSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    edit: editReducer,
    home: homeReducer,
    connections: connectionReducer,
    requests: requestReducer,
    projects: projectReducer,
  },
});

export default appStore;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import editReducer from "./editSlice";
import connectionReducer from "./connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    edit: editReducer,
    connections: connectionReducer,
  },
});

export default appStore;

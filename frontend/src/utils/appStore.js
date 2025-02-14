import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import editReducer from "./editSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    edit: editReducer,
  },
});

export default appStore;

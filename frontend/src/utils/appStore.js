import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import editReducer from "./editSlice";
import homeReducer from "./homeSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import projectReducer from "./projectSlice";

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  edit: editReducer,
  home: homeReducer,
  connections: connectionReducer,
  requests: requestReducer,
  projects: projectReducer,
});

const masterReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, masterReducer);

export const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(appStore);

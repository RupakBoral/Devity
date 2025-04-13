import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
// Reducers
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import editReducer from "./editSlice";
import homeReducer from "./homeSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import projectReducer from "./projectSlice";

// Combine all slices
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  edit: editReducer,
  home: homeReducer,
  connections: connectionReducer,
  requests: requestReducer,
  projects: projectReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Wrap the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with serializableCheck adjustment
export const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions related to Redux Persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(appStore);

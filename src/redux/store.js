import {combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import listingSlice from "./listingSlice";

const rootReducer = combineReducers({ user: userSlice,list:listingSlice });
const persistConfig = {
    key: "root",
    storage,
    version: 1,
  };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultmiddleware) =>
    getDefaultmiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
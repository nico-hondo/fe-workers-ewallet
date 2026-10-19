import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  REGISTER,
  FLUSH,
  PAUSE,
  PURGE,
} from "redux-persist";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import topUpReducer from "./slice/transactionSlice";
import historyReducer from "./slice/historySlice";

const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  topUp: topUpReducer,
  history: historyReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, REGISTER, FLUSH, PAUSE, PURGE],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

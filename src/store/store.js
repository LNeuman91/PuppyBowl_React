import { configureStore } from "@reduxjs/toolkit";
import api from "./api"; // Correct path to api.js

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

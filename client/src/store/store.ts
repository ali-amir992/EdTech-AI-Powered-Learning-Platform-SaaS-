import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"; // Ensure this matches your folder structure

export const store = configureStore({
    reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

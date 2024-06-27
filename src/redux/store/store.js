import { configureStore } from "@reduxjs/toolkit";
import { watchlistReducer } from "../reducers/watchlistReducer";

export const store = configureStore({
    reducer:{
        watchlistReducer
    }
})
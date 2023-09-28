import {configureStore} from "@reduxjs/toolkit";
import {examSlice} from "./examSlice";

export const getStore = () => configureStore({
    reducer: {
        exam: examSlice.reducer
    }
})

export type AppStore = ReturnType<typeof getStore>;
export type RootState = ReturnType<AppStore['getState']>
export type Dispatch = AppStore['dispatch']
import { configureStore } from "@reduxjs/toolkit";
import ticketSliceReducer from "./ticketSlice";
import userSliceReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        tickets: ticketSliceReducer,
        user: userSliceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
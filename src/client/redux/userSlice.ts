import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    name: string
}

interface UserState {
    user: User
}

const initialState: UserState = {
    user: {
        name: ""
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, { payload }: PayloadAction<User>) => {
            state.user = payload;
        },
        logout: state => {
            state = initialState
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
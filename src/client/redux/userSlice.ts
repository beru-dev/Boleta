import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchAPI from "../utils/fetchAPI";

export interface User {
    name: string
    token: string
}

interface UserState {
    user: User
    isError: boolean
    isLoading: boolean
    isSuccess: boolean
    message: string
}

const initialState: UserState = {
    user: {
        name: "",
        token: ""
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const login = createAsyncThunk(
    "user/login",
    async (user: User, thunkAPI) => {
        try {
            const auth = await fetchAPI("user/login", "POST", user, false);
            localStorage.setItem('user', JSON.stringify(auth));
            return auth.user_name
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            state = initialState
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, { payload }: PayloadAction<User>) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.user = payload
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false,
                state.isError = true,
                state.message = payload as string,
                state.user = { name: "", token: "" }
            })
    }
});

export default userSlice.reducer;
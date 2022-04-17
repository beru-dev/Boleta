import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Ticket } from "../../types/ModelTypes";
import fetchAPI from "../utils/fetchAPI";

interface Tickets {
    tickets: Ticket[]
    activeTicket: Ticket | undefined
    isError: boolean
    isLoading: boolean
    isSuccess: boolean
    message: string
}

const initialState: Tickets = {
    tickets: [],
    activeTicket: undefined,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getTickets = createAsyncThunk(
    "tickets/get",
    async (url: string = "", thunkAPI) => {
        try {
            return await fetchAPI(`ticket/${url}`);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getTicket = createAsyncThunk(
    "ticket/get",
    async (ticketId: string, thunkAPI) => {
        resetTickets();
        try {
            return await fetchAPI(`ticket?ticket=${ticketId}`);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        resetTickets: state => {
            state = initialState;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getTickets.pending, state => {
                state.isLoading = true,
                state.isSuccess = false
            })
            .addCase(getTickets.fulfilled, (state, { payload }: PayloadAction<Ticket[]>) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.tickets = payload
            })
            .addCase(getTickets.rejected, (state, { payload }) => {
                state.isLoading = false,
                state.isSuccess = false,
                state.isError = true,
                state.message = (payload as string).toString(),
                state.tickets = []
            })
            .addCase(getTicket.pending, state => {
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, { payload }: PayloadAction<Ticket[]>) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.activeTicket = payload[0]
            })
            .addCase(getTicket.rejected, (state) => {
                state.isLoading = false,
                state.isError = true,
                state.message = "Ticket not found",
                state.activeTicket = undefined
            })
    }
});

export const { resetTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
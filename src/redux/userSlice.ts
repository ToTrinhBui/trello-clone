import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from './store';

interface UserState {
    user: any;
    token: any;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    token: null,
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout: () => {
            return initialState;
        },
        clearPersistedState: () => { },
    }
});


export const { login, logout, clearPersistedState } = userSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default userSlice.reducer;
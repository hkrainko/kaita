import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {AuthType} from "../../../domain/auth/auth-type";

export interface AuthState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    value: 0,
    status: 'idle',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {

        }
    },
    extraReducers: (builder => {
        builder
            .addCase(getAuthUrl.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAuthUrl.fulfilled, (state, action) => {
                state.status = 'idle'
                // state.value = action.payload
            })
    })
})

export const {logout} = authSlice.actions

export const getAuthUrl = createAsyncThunk(
    'auth/getAuthUrl',
    async (amount: number, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        return await ad.authRepo.getAuthUrl(AuthType.Facebook)
    }
);


// export const getAuthUrl = (url: string): AppThunk => (
//     dispatch,
//     getState,
// ) => {
//
// }

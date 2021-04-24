import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {AuthType} from "../../../domain/auth/auth-type";

export interface AuthState {
    value: number
    status: 'loggedIn' | 'loggingIn' | 'notLoggedIn'
    authUrl: string | null
}

const initialState: AuthState = {
    value: 0,
    status: 'notLoggedIn',
    authUrl: null,
};

export const getAuthUrl = createAsyncThunk(
    'auth/getAuthUrl',
    async (authType: AuthType, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        return await ad.authRepo.getAuthUrl(authType)
    }
);

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
                state.status = 'loggingIn'
            })
            .addCase(getAuthUrl.fulfilled, (state, action) => {
                state.status = 'loggedIn'
                state.authUrl = action.payload
            })
            .addCase(getAuthUrl.rejected, (state, action) => {
                state.status = 'notLoggedIn'
                console.log(`getAuthUrl.rejected:${action.payload}`)
                state.authUrl = null
            })
    })
})

export const {logout} = authSlice.actions


export default authSlice.reducer


// export const getAuthUrl = (url: string): AppThunk => (
//     dispatch,
//     getState,
// ) => {
//
// }

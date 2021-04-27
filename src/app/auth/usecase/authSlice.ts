import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {AuthType} from "../../../domain/auth/model/auth-type";
import {AuthState as AuthStatus} from "../../../domain/auth/model/auth-state";
import {User, UserState} from "../../../domain/user/user";

export interface AuthState {
    authState: AuthStatus
    user: User | null
}

const initialState: AuthState = {
    authState: AuthStatus.UnAuth,
    user: null
};

export const submitAuthCallback = createAsyncThunk(
    'auth/submitAuthCallback',
    async ({authType, code, state}: { authType: AuthType, code: string, state: string }, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        return await ad.authRepo.authCallback(authType, code, state);
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.authState = AuthStatus.UnAuth
            state.user = null
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(submitAuthCallback.pending, (state) => {
                state.authState = AuthStatus.Authing
            })
            .addCase(submitAuthCallback.fulfilled, (state, action) => {
                switch (action.payload.state) {
                    case UserState.Active:
                        state.authState = AuthStatus.Authed
                        state.user = action.payload
                        break;
                    case UserState.Pending:
                        state.authState = AuthStatus.Authing
                        break;
                    case UserState.Terminated:
                        state.authState = AuthStatus.UnAuth
                        break;
                    default:
                        break;
                }
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

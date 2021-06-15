import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {AuthType} from "../../../domain/auth/model/auth-type";
import {AuthState as AuthStatus} from "../../../domain/auth/model/auth-state";
import {UserState} from "../../../domain/user/user";
import {AuthUser} from "../../../domain/auth-user/model/auth-user";
import {register} from "../../register/usecase/registerSlice";

export interface AuthState {
    authState: AuthStatus
    authUser: AuthUser | null
}

const initialState: AuthState = {
    authState: AuthStatus.Idle,
    authUser: null
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
            state.authState = AuthStatus.Idle
            state.authUser = null
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
                        state.authUser = action.payload
                        break;
                    case UserState.Pending:
                        state.authState = AuthStatus.Authed
                        state.authUser = action.payload
                        break;
                    case UserState.Terminated:
                        state.authState = AuthStatus.Failed
                        break;
                    default:
                        break;
                }
            })
            .addCase(submitAuthCallback.rejected, (state, action) => {
                state.authState = AuthStatus.Failed
            })
            .addCase(register.fulfilled, (state, action) => {
                state.authUser = action.payload
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

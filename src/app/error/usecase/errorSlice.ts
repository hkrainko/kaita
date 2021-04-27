import {AppError, UnAuthError} from "../../../domain/error/model/error";
import {createSlice} from "@reduxjs/toolkit";
import {submitAuthCallback} from "../../auth/usecase/authSlice";
import {UserState} from "../../../domain/user/user";
import {UserTerminatedError} from "../../../domain/error/model/user-error";

export interface ErrorState {
    error: AppError | null
}

const initialState: ErrorState = {
    error: null
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        dismissError: (state => {
            state.error = null
        })
    },
    extraReducers: (builder => {
        builder
            .addCase(submitAuthCallback.fulfilled, (state, action) => {
                if (action.payload.state === UserState.Terminated) {
                    state.error = new UserTerminatedError()
                }
            })
            .addCase(submitAuthCallback.rejected, (state, action) => {
                console.log(`error:${action.error}`)
                state.error = new UnAuthError()
            })
    })
})

import {AppError, RegisterError, UnAuthError} from "../../../domain/error/model/error";
import {AnyAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {submitAuthCallback} from "../../auth/usecase/authSlice";
import {UserState} from "../../../domain/user/user";
import {UserTerminatedError} from "../../../domain/error/model/user-error";
import {AppThunk} from "../../store";
import {register} from "../../register/usecase/registerSlice";

export interface ErrorState {
    message: string | null
}

const initialState: ErrorState = {
    message: null
}

function isRejectedAction(action: AnyAction): boolean {
    return action.type.endsWith("/rejected");
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        dismissErrorAlert: (state => {
            state.message = null
        }),
        showErrorMessage: ((state, action: PayloadAction<string>) => {
            state.message = action.payload
        })
    },
    extraReducers: (builder => {
        builder
            .addCase(submitAuthCallback.fulfilled, (state, action) => {
                if (action.payload.state === UserState.Terminated) {
                    state.message = new UserTerminatedError().message
                }
            })
            .addCase(submitAuthCallback.rejected, (state, action) => {
                console.log(`error:${JSON.stringify(action.error)}`)
                state.message = new UnAuthError().message
            })
            .addCase(register.rejected, (state, action) => {
                console.log(`error:${JSON.stringify(action.error)}`)
                state.message = new RegisterError().message
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.message = action.error.message
            })
    })
})

export const {dismissErrorAlert, showErrorMessage} = errorSlice.actions

export const showErrorAlert = (appError: AppError): AppThunk => (
    dispatch,
    getState
) => {
    dispatch(showErrorMessage(appError.message));
}


export default errorSlice.reducer

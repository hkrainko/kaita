import {AnyAction, createSlice} from "@reduxjs/toolkit";

export interface LoadingState {
    loading: boolean
}

const initialState: LoadingState = {
    loading: false
}

function isPendingAction(action: AnyAction): boolean {
    return action.type.endsWith("/pending");
}

function isFulFilledOrRejectedAction(action: AnyAction): boolean {
    return action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected");
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder
            .addMatcher(isPendingAction, (state, action) => {
                state.loading = true
            })
            .addMatcher(isFulFilledOrRejectedAction, (state, action) => {
                state.loading = false
            })
    })
})

export default loadingSlice.reducer

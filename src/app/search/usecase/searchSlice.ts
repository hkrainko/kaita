import {createSlice} from "@reduxjs/toolkit";

export interface SearchState {

}

const initialState: SearchState = {

}

export const searchSlice = createSlice({
    name: 'openCommission',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {


    })
})

export default searchSlice.reducer

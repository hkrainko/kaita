import {Commission} from "../../../domain/commission/model/commission";
import {createSlice} from "@reduxjs/toolkit";

export interface CommissionState {
    byId: {[id: string]: Commission}
}

const initialState: CommissionState = {
    byId: {}
}

export const commissionSlice = createSlice({
    name: 'commission',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {

    })
})

export default commissionSlice.reducer

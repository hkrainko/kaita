import {Commission} from "../../../domain/commission/model/commission";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {RootState} from "../../store";
import {CommissionCreator} from "../../../domain/commission/model/commission-creator";
import {UnAuthError} from "../../../domain/error/model/error";
import {CommissionFilter} from "../../../domain/commission/model/commission-filter";
import {OpenCommissionErrorUnknown} from "../../../domain/open-commission/model/open-commission-error";
import {CommissionSorter} from "../../../domain/commission/model/commission-sorter";
import {CommissionsBatch} from "../../../domain/commission/model/commissions-batch";

export interface CommissionState {
    byId: { [id: string]: Commission }
}

const initialState: CommissionState = {
    byId: {}
}

export const submitCommission = createAsyncThunk<string,
    { creator: CommissionCreator },
    { state: RootState, extra: AppDependency }>(
    'commission/submitCommission',
    async ({creator}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw UnAuthError
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.commRepo.submitCommission(authUser.apiToken, authUser.userId, creator)
    }
)

export const getCommissions = createAsyncThunk<CommissionsBatch,
    {filter: CommissionFilter, sorter: CommissionSorter},
    {state: RootState, extra: AppDependency}>(
        'commission/getCommissions',
    async ({filter, sorter}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw OpenCommissionErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.commRepo.getCommissions(authUser.apiToken, filter, sorter)
    }
)

export const commissionSlice = createSlice({
    name: 'commission',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getCommissions.pending, (state, action) => {

            })
            .addCase(getCommissions.fulfilled, (state, action) => {
                action.payload.commissions.forEach(comm => {
                    state.byId[comm.id] = comm
                })
            })
    })
})

export default commissionSlice.reducer

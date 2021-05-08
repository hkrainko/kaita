import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OpenCommission} from "../../../domain/open-commission/model/open-commission";
import {OpenCommissionCreator} from "../../../domain/open-commission/model/open-commission-creator";
import {RootState} from "../../store";
import AppDependency from "../../di";
import {OpenCommissionErrorUnknown} from "../../../domain/open-commission/model/open-commission-error";
import {OpenCommissionUpdater} from "../../../domain/open-commission/model/open-commission-updater";
import {OpenCommissionFilter} from "../../../domain/open-commission/model/open-commission-filter";
import GetOpenCommissionsResult from "../../../domain/open-commission/model/get-open-commissions-result";

export interface OpenCommissionState {
    allIds: string[]
    byId: { [id: string]: OpenCommission }
}

const initialState: OpenCommissionState = {
    allIds: [],
    byId: {}
};

export const getOpenCommissions = createAsyncThunk<GetOpenCommissionsResult,
    { filter: OpenCommissionFilter },
    { state: RootState, extra: AppDependency }>(
    'openCommission/getOpenCommissions',
    async ({filter}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw OpenCommissionErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.openCommRepo.getOpenCommissions(filter)
    }
)

export const addOpenCommission = createAsyncThunk<string,
    { creator: OpenCommissionCreator },
    { state: RootState, extra: AppDependency }>(
    'openCommission/addOpenCommission',
    async ({creator}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw OpenCommissionErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.openCommRepo.addOpenCommission(authUser.apiToken, authUser.userId, creator)
    }
)

export const updateOpenCommission = createAsyncThunk<string,
    { updater: OpenCommissionUpdater },
    { state: RootState, extra: AppDependency }>(
    'openCommission/updateOpenCommission',
    async ({updater}, thunkAPI) => {
        const apiToken = thunkAPI.getState().auth.authUser?.apiToken
        if (!apiToken) {
            throw OpenCommissionErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.openCommRepo.updateOpenCommission(apiToken, updater)
    }
)

export const deleteOpenCommission = createAsyncThunk<string,
    { openCommId: string },
    { state: RootState, extra: AppDependency }>(
    'openCommission/deleteOpenCommission',
    async ({openCommId}, thunkAPI) => {
        const apiToken = thunkAPI.getState().auth.authUser?.apiToken
        if (!apiToken) {
            throw OpenCommissionErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.openCommRepo.deleteOpenCommission(apiToken, openCommId)
    }
)

export const openCommissionSlice = createSlice({
    name: 'openCommission',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getOpenCommissions.fulfilled, (state, action) => {
                action.payload.openCommissions.forEach(oc => {
                    const index = state.allIds.indexOf(oc.id)
                    if (index !== -1) {
                        state.allIds.splice(index, 1)
                    }
                    state.allIds.push(oc.id)
                    state.byId[oc.id] = oc
                })
            })
            .addCase(addOpenCommission.fulfilled, (state, action) => {

            })
            .addCase(updateOpenCommission.fulfilled, (state, action) => {

            })
            .addCase(deleteOpenCommission.fulfilled, (state, action) => {

            })
    })
})

export default openCommissionSlice.reducer

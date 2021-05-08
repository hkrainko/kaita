import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OpenCommission} from "../../../domain/open-commission/model/open-commission";
import {OpenCommissionCreator} from "../../../domain/open-commission/model/open-commission-creator";
import {RootState} from "../../store";
import AppDependency from "../../di";
import {OpenCommissionErrorUnknown} from "../../../domain/open-commission/model/open-commission-error";
import {OpenCommissionUpdater} from "../../../domain/open-commission/model/open-commission-updater";
import {OpenCommissionFilter} from "../../../domain/open-commission/model/open-commission-filter";
import GetOpenCommissionsResult from "../../../domain/open-commission/model/get-open-commissions-result";
import {RequestState} from "../../../domain/common/request-state";

export interface OpenCommissionState {
    byId: { [id: string]: OpenCommission }
    forArtist: {
        artistId?: string
        ids: string[]
        fetchCount?: number
        offset?: number
        total?: number
        requestState: RequestState
        requestId?: string
    }
}

const initialState: OpenCommissionState = {
    byId: {},
    forArtist: {
        artistId: undefined,
        ids: [],
        fetchCount: undefined,
        offset: undefined,
        total: undefined,
        requestState: RequestState.Idle,
        requestId: undefined,
    }
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
            .addCase(getOpenCommissions.pending, (state, action) => {
                state.forArtist = {
                    artistId: action.meta.arg.filter.artistId,
                    ids: [],
                    fetchCount: action.meta.arg.filter.count,
                    offset: action.meta.arg.filter.offset,
                    total: undefined,
                    requestState: RequestState.Loading,
                    requestId: action.meta.requestId
                }
            })
            .addCase(getOpenCommissions.fulfilled, (state, action) => {
                if (state.forArtist.requestId !== action.meta.requestId
                ) {
                    action.payload.openCommissions.forEach(oc => {
                        state.byId[oc.id] = oc
                    })
                    return
                }
                let ids: string[] = []
                action.payload.openCommissions.forEach(oc => {
                    state.byId[oc.id] = oc
                    ids.push(oc.id)
                })
                state.forArtist = {
                    artistId: action.meta.arg.filter.artistId,
                    ids: ids,
                    fetchCount: action.payload.fetchCount,
                    offset: action.payload.offset,
                    total: action.payload.total,
                    requestState: RequestState.Succeed,
                    requestId: action.meta.requestId
                }
            })
            .addCase(getOpenCommissions.rejected, (state, action) => {
                if (state.forArtist.requestId !== action.meta.requestId
                ) {
                    return
                }
                state.forArtist.requestState = RequestState.Failed
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

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OpenCommission} from "../../../domain/open-commission/model/open-commission";
import {OpenCommissionCreator} from "../../../domain/open-commission/model/open-commission-creator";
import {RootState} from "../../store";
import AppDependency from "../../di";
import {OpenCommissionErrorUnknown} from "../../../domain/open-commission/model/open-commission-error";

export interface OpenCommissionState {
    addIds: string[]
    byId: { [id: string]: OpenCommission }
}

const initialState: OpenCommissionState = {
    addIds: [],
    byId: {}
};

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

export const openCommissionSlice = createSlice({
    name: 'openCommission',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {

    })
})

export default openCommissionSlice.reducer

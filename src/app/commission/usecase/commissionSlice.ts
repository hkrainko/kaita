import {Commission} from "../../../domain/commission/model/commission";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {RootState} from "../../store";
import {CommissionCreator} from "../../../domain/commission/model/commission-creator";
import {AppError, UnAuthError, UnknownError} from "../../../domain/error/model/error";
import {CommissionFilter} from "../../../domain/commission/model/commission-filter";
import {OpenCommissionErrorUnknown} from "../../../domain/open-commission/model/open-commission-error";
import {CommissionSorter} from "../../../domain/commission/model/commission-sorter";
import {CommissionsBatch} from "../../../domain/commission/model/commissions-batch";
import {RequestState} from "../../../domain/common/request-state";

export interface CommissionState {
    byId: { [id: string]: Commission }
    received: {
        ids: string[]
        fetchCount?: number
        offset?: number
        total?: number
        requestState: RequestState
        requestId?: string
    },
    submitted: {
        ids: string[]
        fetchCount?: number
        offset?: number
        total?: number
        requestState: RequestState
        requestId?: string
    }
    chatServiceConnection: 'idle' | 'connected' | 'reconnecting' | 'disconnected'
}

const initialState: CommissionState = {
    byId: {},
    received: {
        fetchCount: undefined,
        ids: [],
        offset: undefined,
        requestId: undefined,
        requestState: RequestState.Idle,
        total: undefined
    },
    submitted: {
        fetchCount: undefined,
        ids: [],
        offset: undefined,
        requestId: undefined,
        requestState: RequestState.Idle,
        total: undefined
    },
    chatServiceConnection: 'idle'
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
    { type: 'submitted' | 'received', filter: CommissionFilter, sorter: CommissionSorter },
    { state: RootState, extra: AppDependency }>(
    'commission/getCommissions',
    async ({type, filter, sorter}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw UnAuthError
        }
        if (type === 'submitted') {
            filter.requesterId = authUser.userId
        } else {
            filter.artistId = authUser.userId
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.commRepo.getCommissions(authUser.apiToken, filter, sorter)
    }
)

export const connectChatService = createAsyncThunk<string,
    void,
    { state: RootState, extra: AppDependency }>(
    'commission/connectChatService',
    async (_, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw UnAuthError
        }

        const promise = new Promise<string>(
            (resolve, reject) => {
                const ad = thunkAPI.extra as AppDependency
                ad.commRepo.startStm(authUser.apiToken, () => {
                    console.log("slice ws connected")
                    resolve('connected')
                }, (err: AppError) => {
                    console.log(`slice ws disconnected err:${err}`)
                    reject(UnknownError)
                }, () => {
                    console.log("slice ws reconnecting")
                }, (message) => {
                    console.log(`slice ws received:${message}`)
                })
            }
        )
        return await promise
    }
)

export const disconnectChatService = createAsyncThunk<void,
    void,
    { state: RootState, extra: AppDependency }>(
    'commission/disconnectChatService',
    async (_, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        ad.commRepo.stopStm()
    }
)

export const commissionSlice = createSlice({
    name: 'commission',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getCommissions.pending, (state, action) => {
                const pendingData = {
                    fetchCount: action.meta.arg.filter.count,
                    ids: [],
                    offset: action.meta.arg.filter.offset,
                    requestId: action.meta.requestId,
                    requestState: RequestState.Idle,
                    total: undefined
                }
                if (action.meta.arg.type === 'submitted') {
                    state.submitted = pendingData
                } else {
                    state.received = pendingData
                }
            })
            .addCase(getCommissions.fulfilled, (state, action) => {
                if ((action.meta.arg.type === 'submitted' && state.submitted.requestId !== action.meta.requestId)
                    || (action.meta.arg.type === 'received' && state.received.requestId !== action.meta.requestId)) {
                    action.payload.commissions.forEach(comm => {
                        state.byId[comm.id] = comm
                    })
                    return
                }
                let ids: string[] = []
                action.payload.commissions.forEach(comm => {
                    state.byId[comm.id] = comm
                    ids.push(comm.id)
                })
                const newData = {
                    fetchCount: action.payload.count,
                    ids: ids,
                    offset: action.payload.offSet,
                    requestId: action.meta.requestId,
                    requestState: RequestState.Succeed,
                    total: action.payload.total
                }
                if (action.meta.arg.type === 'submitted') {
                    state.submitted = newData
                } else {
                    state.received = newData
                }
            })
    })
})

export default commissionSlice.reducer

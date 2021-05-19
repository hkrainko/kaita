import {Commission} from "../../../domain/commission/model/commission";
import {Action, createAsyncThunk, createSlice, Middleware, MiddlewareAPI, PayloadAction} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {RootState} from "../../store";
import {CommissionCreator} from "../../../domain/commission/model/commission-creator";
import {AppError, UnAuthError, UnknownError} from "../../../domain/error/model/error";
import {CommissionFilter} from "../../../domain/commission/model/commission-filter";
import {CommissionSorter} from "../../../domain/commission/model/commission-sorter";
import {CommissionsBatch} from "../../../domain/commission/model/commissions-batch";
import {RequestState} from "../../../domain/common/request-state";
import {Message} from "../../../domain/message/model/message";
import {MessagesBatch} from "../../../domain/commission/model/messages-batch";
import {CommissionUpdater} from "../../../domain/commission/model/commission-updater";
import {MessageCreator} from "../../../domain/message/model/message-creator";

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
    chatServiceConnection: 'idle' | 'connected' | 'connecting' | 'reconnecting' | 'disconnected'
    messageIdsByCommissionId: { [id: string]: string[] }
    messageByIds: {[id: string]: Message}
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
    chatServiceConnection: 'idle',
    messageIdsByCommissionId: {},
    messageByIds: {}
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

export const updateCommission = createAsyncThunk<string,
    { commId: string, updater: CommissionUpdater },
    { state: RootState, extra: AppDependency }>(
    'commission/updateCommission',
    async ({commId, updater}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw UnAuthError
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.commRepo.updateCommission(authUser.apiToken, commId, updater)
    }
)

export const getMessages = createAsyncThunk<MessagesBatch,
    { commId: string, count: number, lastMessageId?: string},
    { state: RootState, extra: AppDependency }>(
    'commission/getMessages',
    async ({commId, lastMessageId, count}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw UnAuthError
        }


        const ad = thunkAPI.extra as AppDependency
        return await ad.commRepo.getMessages(authUser.apiToken, commId, count, lastMessageId)
    }
)

export const sendMessage = createAsyncThunk<Message,
    { msgCreator: MessageCreator },
    { state: RootState, extra: AppDependency }>(
    'commission/sendMessage',
    async ({msgCreator}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw UnAuthError
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.commRepo.sendMessage(authUser.apiToken, msgCreator)
    }
)

export const commissionSlice = createSlice({
    name: 'commission',
    initialState: initialState,
    reducers: {
        connectCommissionService(state) {
            state.chatServiceConnection = 'connecting'
        },
        disconnectCommissionService(state) {

        },
        commissionServiceConnected(state) {
            state.chatServiceConnection = 'connected'
        },
        commissionServiceDisconnected(state, action: PayloadAction<string>) {
            state.chatServiceConnection = 'disconnected'
        },
        commissionServiceReceived(state, action: PayloadAction<Message>) {

        },
        commissionServiceConnectionFailed(state, action: PayloadAction<string>) {
            state.chatServiceConnection = 'disconnected'
        }
    },
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
            .addCase(updateCommission.fulfilled, (state, action) => {

            })
            .addCase(getMessages.fulfilled, (state, action) => {
                const allMsgId = state.messageIdsByCommissionId[action.payload.commissionId]
                let ids: string[] = []
                action.payload.messages.forEach(msg => {
                    state.messageByIds[msg.id] = msg
                    ids.push(msg.id)
                })
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                // TODO: do any things?
            })
    })
})

type Options = {
    appDependency: AppDependency,
}

export const wsMiddleWare = (options: Options): Middleware => {

    // Middleware function.
    return (store: MiddlewareAPI) => (next) => (action: Action) => {
        const {dispatch} = store;
        switch (action.type) {
            case connectCommissionService.type:
                const authUser = store.getState().auth.authUser
                if (!authUser) {
                    dispatch(commissionServiceConnectionFailed(new UnAuthError().message))
                    break
                }
                options.appDependency.commRepo.startStm(authUser.apiToken, () => {
                    console.log("slice ws connected")
                    dispatch(commissionServiceConnected())
                }, (err: AppError) => {
                    console.log(`slice ws disconnected err:${err}`)
                    dispatch(commissionServiceDisconnected(err.message))
                }, () => {
                    console.log("slice ws reconnecting")
                }, (message) => {
                    console.log(`slice ws received:${message}`)
                })
                break
            case disconnectCommissionService.type:
                options.appDependency.commRepo.stopStm()
                break
            default:
                break
        }

        return next(action);
    };
};

export const {
    connectCommissionService,
    disconnectCommissionService,
    commissionServiceConnected,
    commissionServiceReceived,
    commissionServiceDisconnected,
    commissionServiceConnectionFailed,
} = commissionSlice.actions

export default commissionSlice.reducer

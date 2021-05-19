import {Action, combineReducers, configureStore, getDefaultMiddleware, ThunkAction} from "@reduxjs/toolkit";
import AppDependency from "./di";
import authReducer from './auth/usecase/authSlice'
import artistReducer from './artist/usecase/artistSlice'
import loadingReducer from './loading/usecase/loadingSlice'
import errorReducer from './error/usecase/errorSlice'
import openCommissionReducer from './open-commission/usecase/openCommissionSlice'
import commissionReducer, {wsMiddleWare} from './commission/usecase/commissionSlice'
import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers(
    {
        auth: authReducer,
        artist: artistReducer,
        openCommission: openCommissionReducer,
        commission: commissionReducer,
        loading: loadingReducer,
        error: errorReducer
    })

const persistConfig = {
    key: 'root',
    version: 1,
    whitelist: ['auth'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {

        const ad = new AppDependency()

        return getDefaultMiddleware(
            {
                thunk: {extraArgument: ad},
                serializableCheck: {
                    //config for redux-persist
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            },
        ).concat(wsMiddleWare({appDependency: ad}))
    },
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

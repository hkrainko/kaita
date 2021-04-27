import {Action, configureStore, getDefaultMiddleware, ThunkAction} from "@reduxjs/toolkit";
import AppDependency from "./di";
import authReducer from './auth/usecase/authSlice'
import loadingReducer from './loading/usecase/loadingSlice'
import errorReducer from './error/usecase/errorSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        error: errorReducer
    },
    middleware: getDefaultMiddleware(
        {
            thunk: {extraArgument: new AppDependency()}
        }
    )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

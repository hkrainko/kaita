import {Action, configureStore, getDefaultMiddleware, ThunkAction} from "@reduxjs/toolkit";
import AppDependency from "./di";
import authReducer from './auth/slice/authSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: getDefaultMiddleware(
        {
            thunk: {extraArgument: new AppDependency()}
        }
    )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>>;

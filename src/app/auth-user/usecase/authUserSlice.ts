import {createAsyncThunk} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {RootState} from "../../store";
import {UnAuthError} from "../../../domain/error/model/error";
import {AuthUser} from "../../../domain/auth-user/model/auth-user";
import {AuthUserUpdater} from "../../../domain/auth-user/model/auth-user-updater";


export const getAuthUser = createAsyncThunk<AuthUser,
    {},
    { state: RootState, extra: AppDependency }>(
    'authUser/getAuthUser',
    async ({}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw UnAuthError
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.authUserRepo.getAuthUser(authUser.apiToken)
    }
)

export const updateAuthUser = createAsyncThunk<string,
    { updater: AuthUserUpdater },
    { state: RootState, extra: AppDependency }>(
    'authUser/updateAuthUser',
    async ({updater}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        if (!authUser) {
            throw UnAuthError
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.authUserRepo.updateAuthUser(authUser.apiToken, updater)
    }
)

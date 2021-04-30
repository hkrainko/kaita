import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthType} from "../../../domain/auth/model/auth-type";
import AppDependency from "../../di";


export const register = createAsyncThunk(
    'register/register',
    async ({authType, code, state}: { authType: AuthType, code: string, state: string }, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        return await ad.authRepo.authCallback(authType, code, state);
    }
)

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {RegisterInfo} from "../../../domain/register/model/register-info";
import {RootState} from "../../store";
import {AuthUser} from "../../../domain/auth-user/auth-user";
import {RegisterErrorUnknown} from "../../../domain/register/model/register-error";


export const register = createAsyncThunk<
    AuthUser,
    RegisterInfo,
    {
        state: RootState,
        extra: AppDependency
    }
    >(
    'register/register',
    async (regInfo, thunkAPI) => {
        const regToken = thunkAPI.getState().auth.authUser?.regToken
        if (!regToken) {
            throw RegisterErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.registerRepo.register(regInfo, regToken)
    }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState: undefined,
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(register.fulfilled, (state, action) => {
            
        })
    })
})

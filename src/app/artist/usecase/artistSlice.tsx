import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {RootState} from "../../store";
import {ArtistErrorUnknown} from "../../../domain/artist/model/artist-error";
import {Artist} from "../../../domain/artist/model/artist";


export interface ArtistState {
    allIds: string[]
    byId: { [id: string]: Artist }
}

const initialState: ArtistState = {
    allIds: [],
    byId: {}
}

/** Async methods **/
export const getArtist = createAsyncThunk<Artist,
    { artistId: string },
    { state: RootState, extra: AppDependency }>(
    'artist/getArtist',
    async ({artistId}, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        return await ad.artistRepo.getArtist(artistId)
    }
)

export const updateArtistBanner = createAsyncThunk<string,
    { artistId: string, bannerImage: File },
    { state: RootState, extra: AppDependency }>(
    'artist/updateArtistBanner',
    async ({artistId, bannerImage}, thunkAPI) => {
        const apiToken = thunkAPI.getState().auth.authUser?.apiToken
        if (!apiToken) {
            throw ArtistErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.artistRepo.updateArtist(apiToken, artistId, {artistBoard: {bannerImage}})
    }
)

export const updateArtistDesc = createAsyncThunk<string,
    { artistId: string, desc: string },
    { state: RootState, extra: AppDependency }>(
    'artist/updateArtistIntro',
    async ({artistId, desc}, thunkAPI) => {
        const apiToken = thunkAPI.getState().auth.authUser?.apiToken
        if (!apiToken) {
            throw ArtistErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.artistRepo.updateArtist(apiToken, artistId, {artistBoard: {desc}})
    }
)
/****************/

export const artistSlice = createSlice({
    name: 'artist',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getArtist.fulfilled, (state, action) => {
                const index = state.allIds.indexOf(action.payload.artistId)
                if (index !== -1) {
                    state.allIds.splice(index, 1)
                }
                state.allIds.push(action.payload.artistId)
                state.byId[action.payload.artistId] = action.payload
            })
            .addCase(updateArtistBanner.fulfilled, (state, action) => {

            })
    })
})

export default artistSlice.reducer

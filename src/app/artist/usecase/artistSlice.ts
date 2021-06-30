import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AppDependency from "../../di";
import {RootState} from "../../store";
import {ArtistErrorUnknown} from "../../../domain/artist/model/artist-error";
import {Artist} from "../../../domain/artist/model/artist";
import {getNewRegisterArtists} from "../../home/usecase/homeSlice";
import {RequestState} from "../../../domain/common/request-state";
import {GetArtistsResult} from "../../../domain/artist/model/get-artists-result";
import {id} from "inversify";


export interface ArtistState {
    allIds: string[]
    byId: { [id: string]: Artist }
    bookmark: {
        ids: string[]
        size: number
        currentPage?: number
        totalPage?: number
    }
    bookmarkedIds: { [id: string]: boolean }
    bookmarkRequestState: RequestState
    bookmarkRequestId?: string
}

const initialState: ArtistState = {
    allIds: [],
    byId: {},
    bookmark: {
        ids: [],
        size: 0,
        currentPage: undefined,
        totalPage: undefined
    },
    bookmarkedIds: {},
    bookmarkRequestState: RequestState.Idle,
    bookmarkRequestId: undefined
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

export const getArtistBookmarks = createAsyncThunk<GetArtistsResult,
    { count: number, offset: number },
    { state: RootState, extra: AppDependency }>(
    'artist/getArtistBookmarks',
    async ({count, offset}, thunkAPI) => {
        const apiToken = thunkAPI.getState().auth.authUser?.apiToken
        if (!apiToken) {
            throw ArtistErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.artistRepo.getArtistBookmarks(apiToken, count, offset)
    }
)

export const getArtistBookmarkIds = createAsyncThunk<string[],
    void,
    { state: RootState, extra: AppDependency }>(
    'artist/getArtistBookmarkIds',
    async (_, thunkAPI) => {
        const apiToken = thunkAPI.getState().auth.authUser?.apiToken
        if (!apiToken) {
            throw ArtistErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.artistRepo.getArtistBookmarkIds(apiToken)
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
                // no need to do anythings?
            })
            .addCase(getNewRegisterArtists.fulfilled, (state, action) => {
                action.payload.artists.forEach(artist => state.byId[artist.artistId] = artist)
            })
            .addCase(getArtistBookmarks.pending, (state, action) => {
                state.bookmarkRequestState = RequestState.Loading
                state.bookmarkRequestId = action.meta.requestId
            })
            .addCase(getArtistBookmarks.fulfilled, (state, action) => {
                if (state.bookmarkRequestId !== action.meta.requestId) {
                    return
                }
                state.bookmarkRequestState = RequestState.Succeed

                let ids: string[] = state.bookmark.ids
                action.payload.artists.forEach(artist => {
                    ids.push(artist.artistId)
                    state.byId[artist.artistId] = artist
                })

                state.bookmark = {
                    ids,
                    size: action.payload.page.size,
                    currentPage: action.payload.page.current,
                    totalPage: action.payload.page.totalPage
                }

            })
            .addCase(getArtistBookmarkIds.fulfilled, (state, action) => {
                let map: { [id: string]: boolean } = {}
                action.payload.forEach(v => {
                    map[v] = true
                })
                state.bookmarkedIds = map
            })
    })
})

export default artistSlice.reducer

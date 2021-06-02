import {Artwork} from "../../../domain/artwork/artwork";
import {RequestState} from "../../../domain/common/request-state";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import AppDependency from "../../di";
import GetArtworksResult from "../../../domain/artwork/model/get-artworks-result";
import {ArtworkFilter} from "../../../domain/artwork/model/artwork-filter";
import {ArtworkSorter} from "../../../domain/artwork/model/artwork-sorter";
import {OpenCommissionUpdater} from "../../../domain/open-commission/model/open-commission-updater";
import {OpenCommissionErrorUnknown} from "../../../domain/open-commission/model/open-commission-error";
import {ArtworkUpdater} from "../../../domain/artwork/model/artwork-updater";


export interface ArtworkState {
    byId: { [id: string]: Artwork }
    forArtist: {
        artistId?: string
        ids: string[]
        fetchCount?: number
        offset?: number
        total?: number
        requestState: RequestState
        requestId?: string
    }
}

const initialState: ArtworkState = {
    byId: {},
    forArtist: {
        artistId: undefined,
        ids: [],
        fetchCount: undefined,
        offset: undefined,
        total: undefined,
        requestState: RequestState.Idle,
        requestId: undefined
    }
}

export const getArtwork = createAsyncThunk<Artwork,
    { artworkId: string },
    { state: RootState, extra: AppDependency }>(
    'artwork/getArtwork',
    async ({artworkId}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        const ad = thunkAPI.extra as AppDependency
        return await ad.artworkRepo.getArtworkById(authUser?.apiToken, artworkId)
    }
)

export const getArtworks = createAsyncThunk<GetArtworksResult,
    { filter: ArtworkFilter, sorter: ArtworkSorter },
    { state: RootState, extra: AppDependency }>(
    'artwork/getArtworks',
    async ({filter, sorter}, thunkAPI) => {
        const authUser = thunkAPI.getState().auth.authUser
        const ad = thunkAPI.extra as AppDependency
        return await ad.artworkRepo.getArtworks(authUser?.apiToken, filter, sorter)
    }
)

export const updateArtwork = createAsyncThunk<string,
    { updater: ArtworkUpdater },
    { state: RootState, extra: AppDependency }>(
    'artwork/updateArtwork',
    async ({updater}, thunkAPI) => {
        const apiToken = thunkAPI.getState().auth.authUser?.apiToken
        if (!apiToken) {
            throw OpenCommissionErrorUnknown
        }
        const ad = thunkAPI.extra as AppDependency
        return await ad.artworkRepo.updateArtwork(apiToken, updater)
    }
)

export const artworkSlice = createSlice({
    name: 'artwork',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getArtworks.pending, (state, action) => {
                state.forArtist = {
                    artistId: action.meta.arg.filter.artistId,
                    ids: [],
                    fetchCount: action.meta.arg.filter.count,
                    offset: action.meta.arg.filter.offset,
                    total: undefined,
                    requestState: RequestState.Loading,
                    requestId: action.meta.requestId
                }
            })
            .addCase(getArtworks.fulfilled, (state, action) => {
                if (state.forArtist.requestId !== action.meta.requestId
                ) {
                    action.payload.artworks.forEach(aw => {
                        state.byId[aw.id] = aw
                    })
                    return
                }
                let ids: string[] = []
                action.payload.artworks.forEach(aw => {
                    state.byId[aw.id] = aw
                    ids.push(aw.id)
                })
                state.forArtist = {
                    artistId: action.meta.arg.filter.artistId,
                    ids: ids,
                    fetchCount: action.meta.arg.filter.count,
                    offset: action.payload.offset,
                    total: action.payload.total,
                    requestState: RequestState.Succeed,
                    requestId: action.meta.requestId
                }
            })
            .addCase(getArtworks.rejected, (state, action) => {
                if (state.forArtist.requestId !== action.meta.requestId
                ) {
                    return
                }
                state.forArtist.requestState = RequestState.Failed
            })
            .addCase(getArtwork.fulfilled, (state, action) => {
                state.byId[action.payload.id] = action.payload
            })
    })
})

export default artworkSlice.reducer

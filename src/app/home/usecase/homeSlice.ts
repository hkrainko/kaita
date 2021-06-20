import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import AppDependency from "../../di";
import {ArtistFilter} from "../../../domain/artist/model/artist-filter";
import {ArtistSorter} from "../../../domain/artist/model/artist-sorter";
import {SortOrder} from "../../../domain/search/model/search-sorter";
import {GetArtistsResult} from "../../../domain/artist/model/get-artists-result";
import GetArtworksResult from "../../../domain/artwork/model/get-artworks-result";
import {ArtworkFilter} from "../../../domain/artwork/model/artwork-filter";
import {ArtworkSorter} from "../../../domain/artwork/model/artwork-sorter";


export interface HomeState {
    newRegisterArtistsIds: string[]
    newArtworkIds: string[]
}

const initialState: HomeState = {
    newRegisterArtistsIds: [],
    newArtworkIds: []
}

export const getNewRegisterArtists = createAsyncThunk<GetArtistsResult,
    { count: number },
    { state: RootState, extra: AppDependency }>(
    'home/getNewRegisterArtists',
    async ({count}, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        let filter: ArtistFilter = {
            count: count,
            offset: 0
        }
        let sorter: ArtistSorter = {
            regTime: SortOrder.Descending
        }
        return await ad.artistRepo.getArtists(filter, sorter)
    }
)

export const getNewArtworks = createAsyncThunk<GetArtworksResult,
    { count: number },
    { state: RootState, extra: AppDependency }>(
    'home/getNewArtworks',
    async ({count}, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        let filter: ArtworkFilter = {
            count: count,
            offset: 0
        }
        let sorter: ArtworkSorter = {
            createTime: false
        }
        return await ad.artworkRepo.getArtworks(undefined, filter, sorter)
    }
)

export const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getNewRegisterArtists.fulfilled, (state, action) => {
                state.newRegisterArtistsIds =  action.payload.artists.map(record => record.artistId)
            })
            .addCase(getNewArtworks.fulfilled, (state, action) => {
                state.newArtworkIds =  action.payload.artworks.map(record => record.id)
            })
    })
})

export default homeSlice.reducer

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import AppDependency from "../../di";
import {ArtistFilter} from "../../../domain/artist/model/artist-filter";
import {ArtistSorter} from "../../../domain/artist/model/artist-sorter";
import {SortOrder} from "../../../domain/search/model/search-sorter";
import {GetArtistsResult} from "../../../domain/artist/model/get-artists-result";


export interface HomeState {
    newRegisterArtistsIds: string[]
}

const initialState: HomeState = {
    newRegisterArtistsIds: []
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

export const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getNewRegisterArtists.fulfilled, (state, action) => {
                state.newRegisterArtistsIds =  action.payload.artists.map(record => record.artistId)
            })
    })
})

export default homeSlice.reducer

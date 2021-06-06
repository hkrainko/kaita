import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OpenCommission} from "../../../domain/open-commission/model/open-commission";
import {RequestState} from "../../../domain/common/request-state";
import {RootState} from "../../store";
import AppDependency from "../../di";
import {OpenCommissionsSearchResult} from "../../../domain/search/model/search-result";
import {OpenCommissionsSearchFilter} from "../../../domain/search/model/search-filter";
import {OpenCommissionsSearchSorter} from "../../../domain/search/model/search-sorter";
import {SearchType} from "../../../domain/search/model/search-type";
import {Artwork} from "../../../domain/artwork/artwork";
import {Artist} from "../../../domain/artist/model/artist";

export interface SearchState {
    forOpenCommissions: {
        byId: { [id: string]: OpenCommission }
        ids: string[]
        size?: number
        currentPage?: number
        totalPage?: number
        text?: string
        filter?: OpenCommissionsSearchFilter
        sorter?: OpenCommissionsSearchSorter
    },
    forArtists: {
        byId: { [id: string]: Artist }
        ids: string[]
        size?: number
        currentPage?: number
        totalPage?: number
    },
    forArtworks: {
        byId: { [id: string]: Artwork }
        ids: string[]
        size?: number
        currentPage?: number
        totalPage?: number
    },
    searchType?: SearchType
    requestState: RequestState
    requestId?: string
}

const initialState: SearchState = {
    forOpenCommissions: {
        byId: {},
        ids: [],
        size: undefined,
        currentPage: undefined,
        totalPage: undefined,
        text: undefined,
        filter: undefined,
        sorter: undefined
    },
    forArtists: {
        byId: {},
        ids: [],
        size: undefined,
        currentPage: undefined,
        totalPage: undefined,
    },
    forArtworks: {
        byId: {},
        ids: [],
        size: undefined,
        currentPage: undefined,
        totalPage: undefined,
    },
    searchType: undefined,
    requestState: RequestState.Idle,
    requestId: undefined,
}

export const searchOpenCommissions = createAsyncThunk<OpenCommissionsSearchResult,
    { text: string, filter: OpenCommissionsSearchFilter, sorter: OpenCommissionsSearchSorter, currentPage: number, pageSize: number },
    { state: RootState, extra: AppDependency }>(
    'search/searchOpenCommissions',
    async ({text, filter, sorter, currentPage, pageSize}, thunkAPI) => {
        const ad = thunkAPI.extra as AppDependency
        return await ad.searchRepo.searchOpenCommissions(text, filter, sorter, currentPage, pageSize)
    }
)

export const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(searchOpenCommissions.pending, (state, action) => {
                state.requestState = RequestState.Loading
                state.requestId = action.meta.requestId
                console.log(`AAA: remove before`)
                if (state.forOpenCommissions.text !== action.meta.arg.text
                    || JSON.stringify(state.forOpenCommissions.filter) !== JSON.stringify(action.meta.arg.filter)
                    || JSON.stringify(state.forOpenCommissions.sorter) !== JSON.stringify(action.meta.arg.sorter)) {
                    console.log(`AAA: remove`)
                    state.forOpenCommissions = {
                        byId: {},
                        ids: [],
                        size: action.meta.arg.pageSize,
                        currentPage: action.meta.arg.currentPage,
                        totalPage: undefined,
                        text: action.meta.arg.text,
                        filter: action.meta.arg.filter,
                        sorter: action.meta.arg.sorter
                    }
                }
            })
            .addCase(searchOpenCommissions.fulfilled, (state, action) => {
                if (state.requestId !== action.meta.requestId) {
                    return
                }
                if (state.forOpenCommissions.text !== action.meta.arg.text
                    || JSON.stringify(state.forOpenCommissions.filter) !== JSON.stringify(action.meta.arg.filter)
                    || JSON.stringify(state.forOpenCommissions.sorter) !== JSON.stringify(action.meta.arg.sorter)) {
                    console.log(`AAA: remove in`)
                    state.forOpenCommissions = {
                        byId: {},
                        ids: [],
                        size: undefined,
                        currentPage: undefined,
                        totalPage: undefined,
                        text: undefined,
                        filter: undefined,
                        sorter: undefined
                    }
                }


                let byId: { [id: string]: OpenCommission } = state.forOpenCommissions.byId
                let ids: string[] = state.forOpenCommissions.ids
                action.payload.openCommissions.forEach(oc => {
                    byId[oc.id] = oc
                    ids.push(oc.id)
                })
                state.forOpenCommissions = {
                    byId,
                    ids,
                    size: action.payload.page.size,
                    currentPage: action.payload.page.current,
                    totalPage: action.payload.page.totalPage,
                    text: action.meta.arg.text,
                    filter: action.meta.arg.filter,
                    sorter: action.meta.arg.sorter,
                }
            })
            .addCase(searchOpenCommissions.rejected, (state, action) => {
                if (state.requestId !== action.meta.requestId
                ) {
                    return
                }
                state.requestState = RequestState.Failed
            })
    })
})

export default searchSlice.reducer

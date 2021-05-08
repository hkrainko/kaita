import {RequestState} from "../../../domain/common/request-state";

export interface PaginationState {
    openCommissionsByArtist: {
        artistId: string
        ids: string[]
        offset: number
        total: number
        loadingStatus: RequestState
    } | null
    artworksByArtist: {
        artistId: string
        pages: {
            ids: string[],
            loadingStatus: RequestState
        }[]
    } | null
}

const initialState: PaginationState = {
    openCommissionsByArtist: null,
    artworksByArtist: null
}



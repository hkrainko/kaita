import {LoadingStatus} from "../../../domain/common/loading-status";

export interface PaginationState {
    openCommissionsByArtist: {
        artistId: string
        pages: {
            ids: string[],
            loadingStatus: LoadingStatus
        }[]
        totalPage: number
    } | null
    artworksByArtist: {
        artistId: string
        pages: {
            ids: string[],
            loadingStatus: LoadingStatus
        }[]
    } | null
}

const initialState: PaginationState = {
    openCommissionsByArtist: null,
    artworksByArtist: null
}



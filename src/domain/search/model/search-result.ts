import {SearchType} from "./search-type";
import {OpenCommission} from "../../open-commission/model/open-commission";
import {Artist} from "../../artist/model/artist";
import {Artwork} from "../../artwork/artwork";


export type SearchResult = OpenCommissionsSearchResult | ArtistsSearchResult | ArtworksSearchResult

interface SearchResultBase {
    page: SearchResultPage
}

export interface OpenCommissionsSearchResult extends SearchResultBase {
    type: SearchType.OpenCommissions
    openCommissions: OpenCommission[]
}

export interface ArtistsSearchResult extends SearchResultBase {
    type: SearchType.Artists
    openCommissions: Artist[]
}

export interface ArtworksSearchResult extends SearchResultBase {
    type: SearchType.Artworks
    openCommissions: Artwork[]
}

export interface SearchResultPage {
    current: number,
    totalPage: number,
    totalResult: number,
    size: number
}


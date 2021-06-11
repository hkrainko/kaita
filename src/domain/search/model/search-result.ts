import {SearchType} from "./search-type";
import {OpenCommission} from "../../open-commission/model/open-commission";
import {Artist} from "../../artist/model/artist";
import {Artwork} from "../../artwork/artwork";


export type SearchResult = OpenCommissionsSearchResult | ArtistsSearchResult | ArtworksSearchResult

type SearchResultBase = {
    // type: SearchType
    page: SearchResultPage
}

export interface OpenCommissionsSearchResult extends SearchResultBase {
    type: SearchType.OpenCommissions
    records: OpenCommission[]
    // filter: OpenCommissionsSearchFilter
    // sorter: OpenCommissionsSearchSorter
}

export interface ArtistsSearchResult extends SearchResultBase {
    type: SearchType.Artists
    records: Artist[]
    // filter: ArtistsSearchFilter
    // sorter: ArtistsSearchSorter
}

export interface ArtworksSearchResult extends SearchResultBase {
    type: SearchType.Artworks
    records: Artwork[]
    // filter: ArtworksSearchFilter
    // sorter: ArtworksSearchSorter
}

export interface SearchResultPage {
    current: number,
    totalPage: number,
    totalResult: number,
    size: number
}


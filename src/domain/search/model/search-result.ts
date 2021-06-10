import {SearchType} from "./search-type";
import {OpenCommission} from "../../open-commission/model/open-commission";
import {Artist} from "../../artist/model/artist";
import {Artwork} from "../../artwork/artwork";
import {ArtistsSearchFilter, ArtworksSearchFilter, OpenCommissionsSearchFilter, SearchFilter} from "./search-filter";
import {ArtistsSearchSorter, ArtworksSearchSorter, OpenCommissionsSearchSorter, SearchSorter} from "./search-sorter";


export type SearchResult = OpenCommissionsSearchResult | ArtistsSearchResult | ArtworksSearchResult

interface SearchResultBase {
    type: SearchType
    page: SearchResultPage
}

export interface OpenCommissionsSearchResult extends SearchResultBase {
    type: SearchType.OpenCommissions
    records: OpenCommission[]
    filter: OpenCommissionsSearchFilter
    sorter: OpenCommissionsSearchSorter
}

export interface ArtistsSearchResult extends SearchResultBase {
    type: SearchType.Artists
    records: Artist[]
    filter: ArtistsSearchFilter
    sorter: ArtistsSearchSorter
}

export interface ArtworksSearchResult extends SearchResultBase {
    type: SearchType.Artworks
    records: Artwork[]
    filter: ArtworksSearchFilter
    sorter: ArtworksSearchSorter
}

export interface SearchResultPage {
    current: number,
    totalPage: number,
    totalResult: number,
    size: number
}


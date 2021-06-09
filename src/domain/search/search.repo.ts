import {ArtistsSearchFilter, ArtworksSearchFilter, OpenCommissionsSearchFilter} from "./model/search-filter";
import {ArtistsSearchSorter, ArtworksSearchSorter, OpenCommissionsSearchSorter} from "./model/search-sorter";
import {ArtistsSearchResult, ArtworksSearchResult, OpenCommissionsSearchResult} from "./model/search-result";

export interface SearchRepo {
    searchOpenCommissions(text: string, filter: OpenCommissionsSearchFilter, sorter: OpenCommissionsSearchSorter, currentPage: number, pageSize: number): Promise<OpenCommissionsSearchResult>
    searchArtists(text: string, filter: ArtistsSearchFilter, sorter: ArtistsSearchSorter, currentPage: number, pageSize: number): Promise<ArtistsSearchResult>
    searchArtworks(text: string, filter: ArtworksSearchFilter, sorter: ArtworksSearchSorter, currentPage: number, pageSize: number): Promise<ArtworksSearchResult>
}

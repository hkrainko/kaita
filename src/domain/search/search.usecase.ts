import {SearchType} from "./model/search-type";
import {
    ArtistsSearchFilter, ArtworksSearchFilter,
    DateRange,
    NumberRange,
    OpenCommissionsSearchFilter,
    SearchFilter
} from "./model/search-filter";
import {
    ArtistsSearchSorter,
    ArtworksSearchSorter,
    OpenCommissionsSearchSorter,
    SearchSorter
} from "./model/search-sorter";

export interface SearchUseCase {

    getSearchTypeName(type: SearchType): string

    // getSearchSelection<T extends SearchFilter, U extends SearchSorter>(type: SearchType): SearchSelection<T, U> | null
    openCommissionSearchSelection: SearchSelection<OpenCommissionsSearchFilter, OpenCommissionsSearchSorter>
    artistsSearchSelection: SearchSelection<ArtistsSearchFilter, ArtistsSearchSorter>
    artworksSearchSelection: SearchSelection<ArtworksSearchFilter, ArtworksSearchSorter>
}

export interface SearchSelection<T extends SearchFilter, U extends SearchSorter> {
    type: SearchType
    groups: (SearchSelectionFilterGroup<T> | SearchSelectionSorterGroup<U>)[]
}

export interface SearchSelectionFilterGroup<T extends SearchFilter> {
    title: string
    multipleSelection: boolean
    options: {
        name: string
    }[]
    compose: (filter: T, selection: boolean[]) => T
}

export interface SearchSelectionSorterGroup<T extends SearchSorter> {
    title: string
    multipleSelection: boolean
    options: {
        name: string
    }[]
    compose: (sorter: T, selection: boolean[]) => T
}

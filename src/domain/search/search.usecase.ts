import {SearchType} from "./model/search-type";
import {SearchFilter} from "./model/search-filter";
import {SearchSorter} from "./model/search-sorter";
import {OpenCommissionsSearchSelection} from "../../app/search/usecase/model/openCommissionsSearchSelection";
import {ArtistsSearchSelection} from "../../app/search/usecase/model/artistsSearchSelection";
import {ArtworksSearchSelection} from "../../app/search/usecase/model/artworksSearchSelection";

export interface SearchUseCase {

    getSearchTypeName(type: SearchType): string

    getOpenCommissionsSearchSelection(): OpenCommissionsSearchSelection
    getArtistsSearchSelection(): ArtistsSearchSelection
    getArtworksSearchSelection(): ArtworksSearchSelection
}

export interface SearchSelection<T extends SearchFilter, U extends SearchSorter> {
    type: SearchType
    groups: (SearchSelectionFilterGroup | SearchSelectionSorterGroup)[]
    getFilter: (selection: boolean[][]) => T
    getSorter: (selection: boolean[][]) => U
}

export interface SearchSelectionFilterGroup {
    title: string
    multipleSelection: boolean
    options: {
        name: string
    }[]
}

export interface SearchSelectionSorterGroup {
    title: string
    multipleSelection: boolean
    options: {
        name: string
    }[]
}

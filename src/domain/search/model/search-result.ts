import {SearchType} from "./search-type";
import {OpenCommission} from "../../open-commission/model/open-commission";


export type SearchResult = OpenCommissionsSearchResult

interface SearchResultBase {
    page: SearchResultPage
}

export interface OpenCommissionsSearchResult extends SearchResultBase {
    type: SearchType.OpenCommissions
    openCommissions: OpenCommission[]
}

export interface SearchResultPage {
    current: number,
    totalPage: number,
    totalResult: number,
    size: number
}


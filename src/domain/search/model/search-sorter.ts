import {SearchType} from "./search-type";

export type SearchSorter = OpenCommissionsSearchSorter

export interface OpenCommissionsSearchSorter {
    type: SearchType.OpenCommissions
    artistId?: SortOrder
    priceFrom?: SortOrder
    priceTo?: SortOrder
    dayNeedFrom?: SortOrder
    dayNeedTo?: SortOrder
    createTime?: SortOrder
    lastUpdatedTime?: SortOrder
}

export enum SortOrder {
    Ascending,
    Descending
}

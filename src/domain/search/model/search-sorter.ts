import {SearchType} from "./search-type";

export type SearchSorter = OpenCommissionsSearchSorter | ArtistsSearchSorter | ArtworksSearchSorter

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

export interface ArtistsSearchSorter {
    type: SearchType.Artists
    artistId?: SortOrder
    userName?: SortOrder
    regTime?: SortOrder
    commissionRequestCount?: SortOrder
    commissionAcceptCount?: SortOrder
    commissionSuccessCount?: SortOrder
    avgRatings?: SortOrder
    lastRequestTime?: SortOrder
}

export interface ArtworksSearchSorter {
    type: SearchType.Artworks
    dayUsed?: SortOrder
    rating?: SortOrder
    views?: SortOrder
    favorCount?: SortOrder
    completedTime?: SortOrder
}

export enum SortOrder {
    Ascending,
    Descending
}

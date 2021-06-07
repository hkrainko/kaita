import {Currency} from "../../price/price";
import {SearchType} from "./search-type";

export type SearchFilter = OpenCommissionsSearchFilter | ArtistsSearchFilter | ArtworksSearchFilter

export interface OpenCommissionsSearchFilter {
    type: SearchType.OpenCommissions
    priceFromRange?: NumberRange
    priceToRange?: NumberRange
    currency?: Currency

    dayNeed?: NumberRange
    isR18?: boolean
    allowBePrivate?: boolean
    allowAnonymous?: boolean
}

export interface ArtistsSearchFilter {
    type: SearchType.Artists
    regTime?: DateRange
    paymentMethods?: string[]
    lastRequestTime?: DateRange
}

export interface ArtworksSearchFilter {
    type: SearchType.Artworks
    dayUsed?: NumberRange
    isR18?: boolean
    anonymous?: boolean
    completedTime?: DateRange
}

export interface NumberRange {
    from: number
    to: number
}

export interface DateRange {
    from: string //Data string
    to: string
}

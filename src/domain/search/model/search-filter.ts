import {Currency} from "../../price/price";

export interface SearchFilter {
    currentPage: number
    pageSize: number
}

export interface OpenCommissionsSearchFilter extends SearchFilter {
    priceFromRange?: NumberRange
    priceToRange?: NumberRange
    currency?: Currency

    dayNeed?: NumberRange
    isR18?: boolean
    allowBePrivate?: boolean
    allowAnonymous?: boolean
}

export interface NumberRange {
    from: number
    to: number
}

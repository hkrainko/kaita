import {Currency} from "../../price/price";

export interface OpenCommissionsSearchFilter {
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

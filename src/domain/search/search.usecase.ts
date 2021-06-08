import {SearchType} from "./model/search-type";
import {DateRange, NumberRange} from "./model/search-filter";

export interface SearchUseCase {

    getSearchTypeName(type: SearchType): string

    getSearchSelection(type: SearchType): SearchSelection | null
}

export interface SearchSelection {
    type: SearchType
    groups: {
        title: string
        multipleSelection: boolean
        options: {
            name: string
        }[]
    }[]
}

export interface OpenCommissionsSearchSelection {
    type: SearchType.OpenCommissions
    prices: {
        title: string,
        fields: { text: string, value: NumberRange }[]
    },
    dayNeed: {
        title: string
        fields: { text: string, value: NumberRange }[]
    }
    others: {
        title: string
        isR18: { text: string, selected: boolean }
        allowBePrivate: { text: string, selected: boolean }
        allowAnonymous: { text: string, selected: boolean }
    }
}

export interface ArtistsSearchSelection {
    type: SearchType.Artists
    regTime: {
        title: string
        fields: { text: string, value: DateRange }[]
    }
    paymentMethods: {
        title: string,
        fields: { text: string, value: string }[]
    }
    lastRequestTime: {
        title: string,
        fields: { text: string, value: DateRange }[]
    }
}

interface ArtworksSearchSelection {
    type: SearchType.Artworks
    prices: {
        title: string,
        fields: { text: string, value: NumberRange }[]
    },
    dayNeed: {
        title: string
        fields: { text: string, value: NumberRange }[]
    }
    others: {
        title: string
        isR18: { text: string, selected: boolean }
        allowBePrivate: { text: string, selected: boolean }
        allowAnonymous: { text: string, selected: boolean }
    }
}

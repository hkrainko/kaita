import {SearchUseCase} from "../../../domain/search/search.usecase";
import {injectable} from "inversify";
import {DateRange, NumberRange} from "../../../domain/search/model/search-filter";
import {SearchType} from "../../../domain/search/model/search-type";
import {symlink} from "fs";
import Type = module

@injectable()
export class DefaultSearchUseCase implements SearchUseCase {


    getSearchFilterSelections(type: SearchType): SearchFilterSelection {
        let selection: SearchFilterSelection = {
            type: SearchType.OpenCommissions,
            groups: [
                {
                    title: "ss",
                    multipleSelection: false,
                    filters: [
                        {
                            name: '',
                        }
                    ]
                }
            ]
        }
        return
    }


}

interface SearchFilterSelection {
    type: SearchType
    groups: {
        title: string
        multipleSelection: boolean
        filters: {
            name: string
        }[]
    }[]
}

interface OpenCommissionsSearchFilter {
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

export interface ArtistsSearchFilter {
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

interface ArtworksSearchFilter {
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

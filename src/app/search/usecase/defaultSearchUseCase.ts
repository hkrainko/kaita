import {SearchUseCase} from "../../../domain/search/search.usecase";
import {injectable} from "inversify";
import {NumberRange} from "../../../domain/search/model/search-filter";

@injectable()
export class DefaultSearchUseCase implements SearchUseCase {


    getOpenCommissionSearchFilter(): string[] {
        return []
    }


}

interface OpenCommissionsSearchFilter {
    type: string
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

interface ArtworksSearchFilter {
    type: string
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

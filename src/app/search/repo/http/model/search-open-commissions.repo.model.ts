import {OpenCommissionsSearchResult, SearchResultPage} from "../../../../../domain/search/model/search-result";
import {OpenCommission} from "../../../../../domain/open-commission/model/open-commission";
import {Mapper} from "../../../../../domain/mapper";
import {SearchType} from "../../../../../domain/search/model/search-type";


export interface SearchOpenCommissionsRepoModel {
    page: SearchResultPage
    openCommissions: OpenCommission[]
}

export class SearchOpenCommissionsRepoModelMapper extends Mapper<SearchOpenCommissionsRepoModel, OpenCommissionsSearchResult> {
    mapFrom(param: SearchOpenCommissionsRepoModel): OpenCommissionsSearchResult {
        return {
            type: SearchType.OpenCommissions,
            page: param.page,
            openCommissions: param.openCommissions
        };
    }

    mapTo(param: OpenCommissionsSearchResult): SearchOpenCommissionsRepoModel {
        return {
            page: param.page,
            openCommissions: param.openCommissions
        };
    }

}

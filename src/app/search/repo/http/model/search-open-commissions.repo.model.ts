import {OpenCommissionsSearchResult, ResultPage} from "../../../../../domain/search/model/search-result";
import {OpenCommission} from "../../../../../domain/open-commission/model/open-commission";
import {Mapper} from "../../../../../domain/mapper";
import {SearchType} from "../../../../../domain/search/model/search-type";


export interface SearchOpenCommissionsRepoModel {
    page: ResultPage
    openCommissions: OpenCommission[]
}

export class SearchOpenCommissionsRepoModelMapper extends Mapper<SearchOpenCommissionsRepoModel, OpenCommissionsSearchResult> {
    mapFrom(param: SearchOpenCommissionsRepoModel): OpenCommissionsSearchResult {
        return {
            type: SearchType.OpenCommissions,
            page: param.page,
            records: param.openCommissions
        };
    }

    mapTo(param: OpenCommissionsSearchResult): SearchOpenCommissionsRepoModel {
        return {
            page: param.page,
            openCommissions: param.records
        };
    }

}

import {OpenCommission} from "../../../../../domain/open-commission/model/open-commission";
import {Mapper} from "../../../../../domain/mapper";
import GetOpenCommissionsResult from "../../../../../domain/open-commission/model/get-open-commissions-result";

export interface GetOpenCommissionsRepoModel {

    openCommissions: OpenCommission[]
    offset: number
    count: number
    total: number
}

export class GetOpenCommissionsRepoModelMapper extends Mapper<GetOpenCommissionsRepoModel, GetOpenCommissionsResult> {
    mapFrom(param: GetOpenCommissionsRepoModel): GetOpenCommissionsResult {
        return param;
    }

    mapTo(param: GetOpenCommissionsResult): GetOpenCommissionsRepoModel {
        return param;
    }

}

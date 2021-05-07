import {Mapper} from "../../../../../domain/mapper";


export interface AddOpenCommissionRepoModel {
  openCommissionId: string;
}

export class AddOpenCommissionRepoModelMapper extends Mapper<AddOpenCommissionRepoModel, string> {
  mapFrom(param: AddOpenCommissionRepoModel): string {
    return param.openCommissionId;
  }

  mapTo(param: string): AddOpenCommissionRepoModel {
    return {
      openCommissionId: param,
    };
  }

}

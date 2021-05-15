import {Mapper} from '../../../../../domain/mapper';


export interface HttpAddCommissionModel {
  commissionId: string;
}

export class HttpAddCommissionModelMapper extends Mapper<HttpAddCommissionModel, string> {
  mapFrom(param: HttpAddCommissionModel): string {
    return param.commissionId;
  }

  mapTo(param: string): HttpAddCommissionModel {
    return {
      commissionId: param
    };
  }


}

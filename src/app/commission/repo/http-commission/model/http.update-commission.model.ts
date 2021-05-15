import {Mapper} from '../../../../../domain/mapper';

export interface HttpUpdateCommissionModel {
  commissionId: string;
}

export class HttpUpdateCommissionModelMapper extends Mapper<HttpUpdateCommissionModel, string> {
  mapFrom(param: HttpUpdateCommissionModel): string {
    return param.commissionId;
  }

  mapTo(param: string): HttpUpdateCommissionModel {
    return {
      commissionId: param
    };
  }

}

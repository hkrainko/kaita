import {Commission} from '../../../../../domain/commission/model/commission';
import {Mapper} from '../../../../../domain/mapper';

export interface HttpGetCommissionModel {
  commission: Commission;
}

export class HttpGetCommissionModelMapper extends Mapper<HttpGetCommissionModel, Commission> {
  mapFrom(param: HttpGetCommissionModel): Commission {
    return param.commission;
  }

  mapTo(param: Commission): HttpGetCommissionModel {
    return {
      commission: param
    };
  }

}

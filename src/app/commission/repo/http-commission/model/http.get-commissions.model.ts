import {Commission} from '../../../../../domain/commission/model/commission';
import {Mapper} from '../../../../../domain/mapper';
import {CommissionsBatch} from '../../../../../domain/commission/model/commissions-batch';


export interface HttpGetCommissionsModel {
  requesterId: string;
  commissions: Commission[];
  offSet: number;
  count: number;
  // total: number; //TODO: get it later
}

export class HttpGetCommissionsModelMapper extends Mapper<HttpGetCommissionsModel, CommissionsBatch> {
  mapFrom(param: HttpGetCommissionsModel): CommissionsBatch {
    return {
      requesterId: param.requesterId,
      commissions: param.commissions,
      offSet: param.offSet,
      count: param.count,
      // total: param.total
    };
  }

  mapTo(param: CommissionsBatch): HttpGetCommissionsModel {
    return {
      requesterId: param.requesterId,
      commissions: param.commissions,
      offSet: param.offSet,
      count: param.count,
      // total: param.total
    };
  }

}

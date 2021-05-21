import {Mapper} from '../../../../../domain/mapper';
import {CommissionsBatch} from '../../../../../domain/commission/model/commissions-batch';
import {HttpCommissionModel, HttpCommissionModelMapper} from "./http.commission.model";


export interface HttpGetCommissionsModel {
  requesterId: string;
  commissions: HttpCommissionModel[];
  offSet: number;
  count: number;
  total: number;
}

export class HttpGetCommissionsModelMapper extends Mapper<HttpGetCommissionsModel, CommissionsBatch> {

  httpCommissionModelMapper = new HttpCommissionModelMapper()

  mapFrom(param: HttpGetCommissionsModel): CommissionsBatch {
    return {
      requesterId: param.requesterId,
      commissions: param.commissions.map(comm => this.httpCommissionModelMapper.mapFrom(comm)),
      offSet: param.offSet,
      count: param.count,
      total: param.total
    };
  }

  mapTo(param: CommissionsBatch): HttpGetCommissionsModel {
    return {
      requesterId: param.requesterId,
      commissions: param.commissions.map(comm => this.httpCommissionModelMapper.mapTo(comm)),
      offSet: param.offSet,
      count: param.count,
      total: param.total
    };
  }

}

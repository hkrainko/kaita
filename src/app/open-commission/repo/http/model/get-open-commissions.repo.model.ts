import {Price} from '../../../../domain/price/price';
import {DayNeed, OpenCommission, OpenCommissionState} from '../../../../domain/open-commission/model/open-commission';
import {Mapper} from '../../../../domain/mapper';

export interface GetOpenCommissionsRepoModel {
  count: number;
  openCommissions: OpenCommission[];
}

export interface GetOpenCommissionRepoModel {
  id: string;
  artistId: string;
  title: string;
  desc: string;
  depositRule?: string;
  price?: Price;
  dayNeed?: DayNeed; // from, to
  timesAllowedDraftToChange?: number;
  timesAllowedCompletionToChange?: number;
  sampleImagePaths: string[];
  state: OpenCommissionState;
  createDate: Date;
  lastUpdateDate: Date;
}

export class GetOpenCommissionsRepoModelMapper extends Mapper<GetOpenCommissionsRepoModel, OpenCommission[]> {
  mapFrom(param: GetOpenCommissionsRepoModel): OpenCommission[] {
    return param.openCommissions;
  }

  mapTo(param: OpenCommission[]): GetOpenCommissionsRepoModel {
    return undefined;
  }

}

// export class GetOpenCommissionRepoModelMapper extends Mapper<GetOpenCommissionsRepoModel, OpenCommission> {
//   mapFrom(param: GetOpenCommissionsRepoModel): OpenCommission {
//     return param.openCommissions;
//   }
//
//   mapTo(param: OpenCommission): GetOpenCommissionsRepoModel {
//     return {
//       id: param.id,
//       artistId: param.artistId,
//       title: param.title,
//       desc: param.desc,
//       depositRule: param.depositRule,
//       price: param.price,
//       dayNeed: param.dayNeed,
//       timesAllowedDraftToChange: param.timesAllowedDraftToChange,
//       timesAllowedCompletionToChange: param.timesAllowedCompletionToChange,
//       sampleImagePaths: param.sampleImagePaths,
//       state: param.state,
//       createDate: param.createDate,
//       lastUpdateDate: param.lastUpdateDate,
//     };
//   }
// }

// export class GetOpenCommissionsRepoModelMapper extends Mapper<GetOpenCommissionsRepoModel[], OpenCommission[]> {
//   mapFrom(param: GetOpenCommissionsRepoModel[]): OpenCommission[] {
//     const mapper = new GetOpenCommissionRepoModelMapper();
//     return param.map(repoModel => mapper.mapFrom(repoModel));
//   }
//
//   mapTo(param: OpenCommission[]): GetOpenCommissionsRepoModel[] {
//     return [];
//   }
//
// }

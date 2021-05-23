import {CommissionAction} from "../../../../../domain/commission/model/commission-action";


export class InvalidateDueToSystemArtistCommissionAction implements CommissionAction {
  title = '系統審查失敗，委托失效。';
  decisions = [];
}

export class InvalidateDueToSystemRequesterCommissionAction implements CommissionAction {
  title = '系統審查失敗，委托失效。';
  decisions = [];
}

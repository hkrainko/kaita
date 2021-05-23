import {CommissionAction} from "../../../../../domain/commission/model/commission-action";


export class PendingValidationArtistCommissionAction implements CommissionAction {
  title = '請等待系統審查委托。';
  decisions = [];
}

export class PendingValidationRequesterCommissionAction implements CommissionAction {
  title = '請等待系統審查委托。';
  decisions = [];
}

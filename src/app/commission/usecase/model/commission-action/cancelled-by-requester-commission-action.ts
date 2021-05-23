import {CommissionAction} from "../../../../../domain/commission/model/commission-action";


export class CancelledByRequesterArtistCommissionAction implements CommissionAction {
  title = '委托人已取消此委托。';
  decisions = [];
}

export class CancelledByRequesterRequesterCommissionAction implements CommissionAction {
  title = '您已取消此委托。';
  decisions = [];
}

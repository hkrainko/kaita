import {RequesterAcceptProductCommissionDecision} from "../commission-decision/commission-requester-accept-product-decision";
import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";
import {CommissionAction} from "../../../../../domain/commission/model/commission-action";


export class PendingRequesterAcceptProductArtistCommissionAction implements CommissionAction {
  title = '正在等待委托人接收完成品。';
  decisions = [];
}

export class PendingRequesterAcceptProductRequesterCommissionAction implements CommissionAction {
  title = '請接收完成品。';
  decisions: CommissionDecision[];

  constructor() {
    this.decisions = [
      new RequesterAcceptProductCommissionDecision()
    ];
  }
}

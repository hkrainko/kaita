import {Observable} from 'rxjs';
import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";
import {
  ArtistAcceptCommissionDecision,
  ArtistDeclineCommissionDecision, RequesterCancelCommissionDecision
} from "../commission-decision/commission-common-decision";
import {CommissionAction} from "../../../../../domain/commission/model/commission-action";

export class PendingArtistApprovalArtistCommissionAction implements CommissionAction {
  title = '正在等待接受委托';
  decisions: CommissionDecision[];

  constructor(makeDeclineDecision: () => Observable<string>, makeAcceptDecision: () => Observable<string>) {
    this.decisions = [
      new ArtistDeclineCommissionDecision(makeDeclineDecision),
      new ArtistAcceptCommissionDecision(makeAcceptDecision),
    ];
  }
}

export class PendingArtistApprovalRequesterCommissionAction implements CommissionAction {
  title = '正在等待繪師接受委托';
  decisions: CommissionDecision[];

  constructor(makeCancelDecision: () => Observable<string>) {
    this.decisions = [
      new RequesterCancelCommissionDecision(makeCancelDecision),
      // new RequesterModifyCommissionDecision()
    ];
  }
}

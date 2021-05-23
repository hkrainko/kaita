import {Observable} from 'rxjs';
import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";
import {
  RequesterAcceptProofCopyCommissionDecision,
  RequesterRequestRevisionCommissionDecision
} from "../commission-decision/commission-common-decision";
import {CommissionAction} from "../../../../../domain/commission/model/commission-action";

export class PendingRequesterAcceptanceArtistCommissionAction implements CommissionAction {
  title = '等待委托人查看完稿。';
  decisions = [];
}

export class PendingRequesterAcceptanceRequesterCommissionAction implements CommissionAction {
  title = '完稿已上傳，請查看。';
  decisions: CommissionDecision[];

  constructor(makeReviseDecision: () => Observable<string>, acceptProofCopyDecision: () => Observable<string>) {
    this.decisions = [
      new RequesterRequestRevisionCommissionDecision(makeReviseDecision),
      new RequesterAcceptProofCopyCommissionDecision(acceptProofCopyDecision),
    ];
  }
}

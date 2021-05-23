import {CommissionAction} from "../../../../../domain/commission/model/commission-action";


export class CompletedArtistCommissionAction implements CommissionAction {
  title = '委托已完成。';
  decisions = [];
}

export class CompletedRequesterCommissionAction implements CommissionAction {
  title = '委托已完成。';
  decisions = [];
}

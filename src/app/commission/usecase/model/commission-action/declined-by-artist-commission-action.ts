import {CommissionAction} from "../../../../../domain/commission/model/commission-action";


export class DeclinedByArtistArtistCommissionAction implements CommissionAction {
  title = '您已拒絕接收此委托。';
  decisions = [];
}

export class DeclinedByArtistRequesterCommissionAction implements CommissionAction {
  title = '繪師已拒絕接受此委托。';
  decisions = [];
}

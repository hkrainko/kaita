import {ArtistUploadProductCommissionDecision} from "../commission-decision/artist-upload-product-commission-decision";
import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";
import {CommissionAction} from "../../../../../domain/commission/model/commission-action";


export class PendingUploadProductDueToRevisionExceedArtistCommissionAction implements CommissionAction {
  title = '已到達完稿修訂上限，請上傳收完成品。';
  decisions: CommissionDecision[];

  constructor() {
    this.decisions = [
      new ArtistUploadProductCommissionDecision(),
    ];
  }
}

export class PendingUploadProductDueToRevisionExceedRequesterCommissionAction implements CommissionAction {
  title = '已到達完稿修訂上限，請等待繪師上傳完成品。';
  decisions = [];
}

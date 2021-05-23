import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";
import {ArtistUploadProductCommissionDecision} from "../commission-decision/artist-upload-product-commission-decision";
import {CommissionAction} from "../../../../../domain/commission/model/commission-action";

export class PendingUploadProductArtistCommissionAction implements CommissionAction {
  title = '請上傳收完成品。';
  decisions: CommissionDecision[];

  constructor() {
    this.decisions = [
      new ArtistUploadProductCommissionDecision(),
    ];
  }
}

export class PendingUploadProductRequesterCommissionAction implements CommissionAction {
  title = '等待繪師上傳完成品。';
  decisions = [];
}

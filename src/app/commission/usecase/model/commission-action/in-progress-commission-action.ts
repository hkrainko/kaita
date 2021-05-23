import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";
import {ArtistUploadProofCopyCommissionDecision} from "../commission-decision/artist-upload-proof-copy-commission-decision";
import {CommissionAction} from "../../../../../domain/commission/model/commission-action";

export class InProgressArtistCommissionAction implements CommissionAction {
  title = '在期限內完成委托';
  decisions: CommissionDecision[] = [new ArtistUploadProofCopyCommissionDecision()];
}

export class InProgressRequesterCommissionAction implements CommissionAction {
  title = '等待繪師完成委托';
  decisions = [];
}

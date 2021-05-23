import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";

export class ArtistUploadProofCopyCommissionDecision implements CommissionDecision {
  title = '上傳完稿';
  desc = '請上傳完稿以供委托人查閱。';
  optName = '上傳完稿';
  path = 'upload-proof-copy';
}

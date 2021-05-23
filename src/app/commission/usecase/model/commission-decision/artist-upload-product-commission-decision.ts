import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";

export class ArtistUploadProductCommissionDecision implements CommissionDecision {
  optName = '提交完成品';
  title = '提交完成品並完成委托';
  desc = '根據委托人要求上傳完成品。';
  path = 'upload-product';
}

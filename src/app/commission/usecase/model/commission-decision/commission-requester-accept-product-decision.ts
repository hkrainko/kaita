import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";

export class RequesterAcceptProductCommissionDecision implements CommissionDecision {
  optName = '接受';
  title = '接受完成品';
  desc = '接受後將完成委托程序。';
  path = 'accept-product';
}

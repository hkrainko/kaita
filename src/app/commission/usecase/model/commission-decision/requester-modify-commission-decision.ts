import {CommissionDecision} from "../../../../../domain/commission/model/commission-decision";

export class RequesterModifyCommissionDecision implements CommissionDecision {
  optName = '變更';
  title = '變更委托內容';
  desc = '變更委托內容並重新審核。';
  path = 'modification';
}

import {CommissionDecision} from "./commission-decision";

export interface CommissionAction {
  title: string;
  decisions: CommissionDecision[];
}

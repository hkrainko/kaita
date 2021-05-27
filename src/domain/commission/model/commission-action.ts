import {CommissionDecisionOption} from "./commission-decision-option";

export interface CommissionAction {
  title: string;
  decisions: CommissionDecisionOption[];
}

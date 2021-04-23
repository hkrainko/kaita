import {CommissionDecision} from "./commission";

export interface CommissionAction {
  title: string;
  decisions: CommissionDecision[];
}

import {CommissionDecision} from "./commission";

export interface CommissionDecisionOption {
  optName: string;
  title: string;
  desc: string;
  decision: CommissionDecision;
}

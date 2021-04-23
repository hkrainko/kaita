import {Observable} from 'rxjs';

export interface CommissionDecision {
  optName: string;
  title: string;
  desc: string;
  path: string;
}

export interface CommissionDecisionMaking extends CommissionDecision {
  make: () => Observable<string>;
}

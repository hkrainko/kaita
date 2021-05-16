import {Commission} from './commission';

export interface CommissionsBatch {
  requesterId: string;
  commissions: Commission[];
  count: number;
  offSet: number;
  total: number;
}

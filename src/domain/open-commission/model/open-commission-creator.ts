import {Price} from '../../price/price';
import {DayNeed} from './open-commission';

export interface OpenCommissionCreator {
  title: string;
  desc: string;
  depositRule?: string;
  price: Price;
  dayNeed: DayNeed; // from, to
  timesAllowedDraftToChange?: number;
  timesAllowedCompletionToChange?: number;
  sampleImages: File[];
  isR18: boolean;
  allowBePrivate: boolean;
  allowAnonymous: boolean;
}

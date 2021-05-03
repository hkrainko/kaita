import {Price} from '../../price/price';

export interface OpenCommission {
  id: string;
  artistId: string;
  title: string;
  desc: string;
  depositRule?: string;
  price?: Price;
  dayNeed?: DayNeed; // from, to
  timesAllowedDraftToChange?: number;
  timesAllowedCompletionToChange?: number;
  sampleImagePaths: string[];
  isR18: boolean;
  allowBePrivate: boolean;
  allowAnonymous: boolean;
  state: OpenCommissionState;
  createDate: string;
  lastUpdateDate: string;
}

export enum OpenCommissionState {
  Active = 'A',
  Hidden = 'H',
  Removed = 'R',
}

export interface DayNeed {
  from: number;
  to: number;
}

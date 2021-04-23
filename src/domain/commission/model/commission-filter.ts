import {Price} from '../../price/price';

export interface CommissionFilter {
  artistId?: string;
  requesterId?: string;
  count: number;
  offset: number;
  priceFrom?: Price;
  priceTo?: Price;
  dayNeedFrom?: number;
  dayNeedTo?: number;
  createTimeFrom?: Date;
  createTimeTo?: Date;
}

export interface OpenCommissionFilter {
  artistId?: string;
  count?: number;
  offset?: number;
  key?: string;
  priceForm?: string;
  priceTo?: string;
  dayNeedGreaterOrEqual?: number;
  dayNeedLessOrEqual?: number;
}

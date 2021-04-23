export interface Price {
  amount: number;
  currency: Currency;
}

export enum Currency {
  HKD = 'HKD',
  TWD = 'TWD',
  USD = 'USD',
}


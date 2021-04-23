import {Price} from '../../price/price';
import {DayNeed, OpenCommissionState} from '../../open-commission/model/open-commission';
import {Size} from '../../artwork/size';

export interface CommissionCreator {
  openCommissionId: string;
  artistId: string;
  requesterId: string;
  price: Price;
  dayNeed: number;
  size?: Size;
  resolution?: number;
  exportFormat?: string;
  desc: string;
  paymentMethod: string;
  isR18: boolean;
  bePrivate: boolean;
  anonymous: boolean;
  refImages: File[];
}

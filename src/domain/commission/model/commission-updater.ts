import {CommissionDecision, CommissionState} from './commission';
import {Price} from '../../price/price';
import {Size} from '../../artwork/size';

export interface CommissionUpdater {
  decision: CommissionDecision;
  price?: Price;
  dayNeed?: number;
  size?: Size;
  resolution?: number;
  exportFormat?: string;
  paymentMethod?: string;
  bePrivate?: boolean;
  anonymous?: boolean;
  rating?: number;
  comment?: string;
  displayImage?: File;
  proofCopyImage?: File;
  completionFile?: File;
}

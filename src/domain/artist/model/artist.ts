import {User} from '../../user/user';
import {OpenCommission} from '../../open-commission/model/open-commission';
import {Artwork} from '../../artwork/artwork';
import {Fans} from './fans';

export interface Artist extends User {
  artistId: string;
  fans: Fans;
  artistIntro: ArtistIntro;
  artistBoard: ArtistBoard;
  paymentMethods: string[];
  commissionDetails: CommissionDetails;
  openCommissions: OpenCommission[];
  artworks: Artwork[];
}

export interface ArtistIntro {
  yearOfDrawing: number;
  artTypes: string[];
}

export interface CommissionDetails {
  commissionRequestCount: number;
  commissionAcceptCount: number;
  commissionSuccessCount: number;
  avgRatings?: number;
  lastRequestTime?: string;
}

export interface ArtistBoard {
  bannerPath: string;
  desc: string;
}

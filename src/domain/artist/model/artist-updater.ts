import {ArtistBoard, ArtistIntro} from './artist';

export interface ArtistUpdater {
  artistIntro?: ArtistIntroUpdater;
  artistBoard?: ArtistBoardUpdater;
  paymentMethods?: [];
}

export interface ArtistIntroUpdater {
  yearOfDrawing?: number;
  artTypes?: string[];
}

export interface ArtistBoardUpdater {
  bannerImage?: File;
  desc?: string;
}

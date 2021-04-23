import {Size} from './size';

export interface Artwork {
  id: string;
  commissionId?: string;
  openCommissionId: string;

  artistId: string;
  artistName: string;
  artistProfilePath?: string;
  requesterId?: string;
  requesterName?: string;
  requesterProfilePath?: string;

  dayUsed: number;
  isR18: string;
  anonymous: boolean;

  path: string;
  volume: number;
  size: Size;
  contentType: string;
  completionFilePath?: string;
  rating: number;
  comment?: string;

  title: string;
  textContent: string;
  views: number;
  favored: boolean;
  favorCount: number;

  createTime: Date;
  startTime: Date;
  completedTime: Date;
  lastUpdateTime: Date;
  state: ArtworkState;
}

export enum ArtworkState {
  Active = 'Active',
  Hidden = 'Hidden',
  Deleted = 'Deleted',
}

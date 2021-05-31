import {Artwork, ArtworkState} from '../../../../../domain/artwork/artwork';
import {Size} from '../../../../../domain/artwork/size';
import {Mapper} from '../../../../../domain/mapper';

export interface HttpGetArtworkResp {
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

export class HttpGetArtworkMapper extends Mapper<HttpGetArtworkResp, Artwork> {
  mapFrom(param: HttpGetArtworkResp): Artwork {
    return {
      favorCount: param.favorCount,
      favored: param.favored,
      startTime: param.startTime,
      views: param.views,
      anonymous: param.anonymous,
      artistId: param.artistId,
      artistName: param.artistName,
      artistProfilePath: param.artistProfilePath,
      comment: param.comment,
      commissionId: param.commissionId,
      completedTime: param.completedTime,
      completionFilePath: param.completionFilePath,
      contentType: param.contentType,
      createTime: param.createTime,
      dayUsed: param.dayUsed,
      id: param.id,
      isR18: param.isR18,
      lastUpdateTime: param.lastUpdateTime,
      openCommissionId: param.openCommissionId,
      path: param.path,
      rating: param.rating,
      requesterId: param.requesterId,
      requesterName: param.requesterName,
      requesterProfilePath: param.requesterProfilePath,
      size: param.size,
      state: param.state,
      volume: param.volume,
      title: param.title,
      textContent: param.textContent
    };
  }

  mapTo(param: Artwork): HttpGetArtworkResp {
    return {
      favorCount: param.favorCount,
      favored: param.favored,
      startTime: param.startTime,
      textContent: param.textContent,
      title: param.title,
      views: param.views,
      anonymous: param.anonymous,
      artistId: param.artistId,
      artistName: param.artistName,
      artistProfilePath: param.artistProfilePath,
      comment: param.comment,
      commissionId: param.commissionId,
      completedTime: param.completedTime,
      completionFilePath: param.completionFilePath,
      contentType: param.contentType,
      createTime: param.createTime,
      dayUsed: param.dayUsed,
      id: param.id,
      isR18: param.isR18,
      lastUpdateTime: param.lastUpdateTime,
      openCommissionId: param.openCommissionId,
      path: param.path,
      rating: param.rating,
      requesterId: param.requesterId,
      requesterName: param.requesterName,
      requesterProfilePath: param.requesterProfilePath,
      size: param.size,
      state: param.state,
      volume: param.volume
    };
  }

}

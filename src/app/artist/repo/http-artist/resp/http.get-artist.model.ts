import {User} from '../../../../../domain/user/user';
import {Fans} from '../../../../../domain/artist/model/fans';
import {Artist, ArtistBoard, ArtistIntro, CommissionDetails} from '../../../../../domain/artist/model/artist';
import {OpenCommission} from '../../../../../domain/open-commission/model/open-commission';
import {Artwork} from '../../../../../domain/artwork/artwork';
import {Mapper} from '../../../../../domain/mapper';


export interface HttpGetArtistModel extends User {
  artistId: string;
  fans: Fans;
  artistIntro: ArtistIntro;
  artistBoard: ArtistBoard;
  paymentMethods: string[];
  commissionDetails: CommissionDetails;
  openCommissions: OpenCommission[];
  artworks: Artwork[];
}

export class HttpGetArtistMapper extends Mapper<HttpGetArtistModel, Artist> {
  mapFrom(param: HttpGetArtistModel): Artist {
    return {
      artistId: param.artistId,
      fans: param.fans,
      artistIntro: param.artistIntro,
      artistBoard: param.artistBoard,
      paymentMethods: param.paymentMethods,
      commissionDetails: param.commissionDetails,
      openCommissions: param.openCommissions,
      artworks: param.artworks,
      isArtist: param.isArtist,
      regTime: param.regTime,
      state: param.state,
      userId: param.userId,
      userName: param.userName,
      profilePath: param.profilePath,
    };
  }

  mapTo(param: Artist): HttpGetArtistModel {
    return {
      artistId: param.artistId,
      fans: param.fans,
      artistIntro: param.artistIntro,
      artistBoard: param.artistBoard,
      paymentMethods: param.paymentMethods,
      commissionDetails: param.commissionDetails,
      openCommissions: param.openCommissions,
      artworks: param.artworks,
      isArtist: param.isArtist,
      regTime: param.regTime,
      state: param.state,
      userId: param.userId,
      userName: param.userName,
      profilePath: param.profilePath,
    };
  }

}


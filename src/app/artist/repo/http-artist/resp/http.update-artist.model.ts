import {Mapper} from '../../../../../domain/mapper';

export interface HttpUpdateArtistModel {
  artistId: string;
}

export class HttpUpdateArtistMapper extends Mapper<HttpUpdateArtistModel, string> {
  mapFrom(param: HttpUpdateArtistModel): string {
    return param.artistId;
  }

  mapTo(param: string): HttpUpdateArtistModel {
    return {
      artistId: param
    };
  }
}

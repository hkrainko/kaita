import {Artwork} from '../../../../../domain/artwork/artwork';
import {Mapper} from '../../../../../domain/mapper';
import GetArtworksResult from "../../../../../domain/artwork/model/get-artworks-result";

export interface HttpGetArtworksResp {
  artistId: string
  artworks: Artwork[];
  offset: number
  fetchCount: number
  total: number
}

export class HttpGetArtworksMapper extends Mapper<HttpGetArtworksResp, GetArtworksResult> {
  mapFrom(param: HttpGetArtworksResp): GetArtworksResult {
    return param;
  }

  mapTo(param: GetArtworksResult): HttpGetArtworksResp {
    return param;
  }

}

import {ArtworkRepo} from '../../../../domain/artwork/artwork.repo';
import {Artwork} from '../../../../domain/artwork/artwork';
import {ArtworkFilter} from '../../../../domain/artwork/model/artwork-filter';
import {ArtworkSorter} from '../../../../domain/artwork/model/artwork-sorter';
import {HttpGetArtworkMapper, HttpGetArtworkResp} from './resp/http.get-artwork.resp';
import {HttpGetArtworksMapper, HttpGetArtworksResp} from './resp/http.get-artworks.resp';
import {injectable} from "inversify";
import GetArtworksResult from "../../../../domain/artwork/model/get-artworks-result";
import axios from "axios";

@injectable()
export class HttpArtworkRepo implements ArtworkRepo {

    private apiPath = 'http://192.168.64.12:31398/api';

    private getArtworkMapper = new HttpGetArtworkMapper();
    private getArtworksMapper = new HttpGetArtworksMapper();

    getArtworkById(apiToken: string | undefined, id: string): Promise<Artwork> {
        return axios
            .get<HttpGetArtworkResp>(`${this.apiPath}/artworks/${id}`, {
                headers: apiToken ? {
                    Authorization: 'Bearer ' + apiToken,
                } : null
            })
            .then(resp => {
                return this.getArtworkMapper.mapFrom(resp.data)
            })
    }

    getArtworks(apiToken: string | undefined, filter: ArtworkFilter, sorter: ArtworkSorter): Promise<GetArtworksResult> {
        const params = {
            artistId: filter.artistId,
            requesterId: filter.requesterId,
            count: filter.count,
            offset: filter.offset
        }

        return axios
            .get<HttpGetArtworksResp>(`${this.apiPath}/artworks`, {
                headers: apiToken ? {
                    Authorization: 'Bearer ' + apiToken,
                } : null,
                params
            })
            .then(resp => {
                return this.getArtworksMapper.mapFrom(resp.data)
            })
    }

}

import {ArtworkRepo} from '../../../../domain/artwork/artwork.repo';
import {Artwork} from '../../../../domain/artwork/artwork';
import {ArtworkFilter} from '../../../../domain/artwork/model/artwork-filter';
import {ArtworkSorter} from '../../../../domain/artwork/model/artwork-sorter';
import {HttpGetArtworkMapper, HttpGetArtworkResp} from './resp/http.get-artwork.resp';
import {HttpGetArtworksMapper, HttpGetArtworksResp} from './resp/http.get-artworks.resp';
import {injectable} from "inversify";
import GetArtworksResult from "../../../../domain/artwork/model/get-artworks-result";
import axios from "axios";
import {ArtworkUpdater} from "../../../../domain/artwork/model/artwork-updater";
import {HttpUpdateArtworkMapper, HttpUpdateArtworkResp} from "./resp/http.update-artwork.resp";
import config from "../../../config";

@injectable()
export class HttpArtworkRepo implements ArtworkRepo {

    private apiPath = config.API_PATH;

    private getArtworkMapper = new HttpGetArtworkMapper()
    private getArtworksMapper = new HttpGetArtworksMapper()
    private updateArtworkMapper = new HttpUpdateArtworkMapper()

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

    updateArtwork(apiToken: string, updater: ArtworkUpdater): Promise<string> {
        const formData: any = new FormData();
        if (updater.title) {
            formData.append('title', updater.title)
        }
        if (updater.textContent) {
            formData.append('textContent', updater.textContent)
        }

        const headers = {
            Authorization: 'Bearer ' + apiToken,
        };

        return axios
            .patch<HttpUpdateArtworkResp>(`${this.apiPath}/artworks/${updater.id}`, formData, {
                headers
            })
            .then(resp => {
                return this.updateArtworkMapper.mapFrom(resp.data)
            })
    }

}

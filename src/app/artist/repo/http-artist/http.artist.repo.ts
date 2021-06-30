import {ArtistRepo} from '../../../../domain/artist/artist.repo';
import {Artist} from '../../../../domain/artist/model/artist';
import {HttpGetArtistMapper, HttpGetArtistModel} from './resp/http.get-artist.model';
import {ArtistUpdater} from '../../../../domain/artist/model/artist-updater';
import {HttpUpdateArtistMapper} from './resp/http.update-artist.model';
import {injectable} from "inversify";
import axios from "axios";
import config from "../../../config";
import {ArtistSorter} from "../../../../domain/artist/model/artist-sorter";
import {ArtistFilter} from "../../../../domain/artist/model/artist-filter";
import {GetArtistsResult} from "../../../../domain/artist/model/get-artists-result";
import {SortOrder} from "../../../../domain/search/model/search-sorter";
import {HttpGetArtistBookmarkIdsMapper, HttpGetArtistBookmarkIdsModel} from "./resp/http.get-artist-bookmark-ids.model";


@injectable()
export class HttpArtistRepo implements ArtistRepo {

    getArtistMapper = new HttpGetArtistMapper()
    updateArtistMapper = new HttpUpdateArtistMapper()
    getArtistBookmarkIdsMapper = new HttpGetArtistBookmarkIdsMapper()

    apiPath = config.API_PATH;

    getArtist(artistId: string): Promise<Artist> {
        return axios
            .get<HttpGetArtistModel>(`${this.apiPath}/artists/${artistId}`)
            .then(resp => {
                return this.getArtistMapper.mapFrom(resp.data)
            })
    }

    getArtists(filter: ArtistFilter, sorter: ArtistSorter): Promise<GetArtistsResult> {

        let params = {
            count: filter.count,
            offset: filter.offset,
            sort: sorter.regTime ? (sorter.regTime === SortOrder.Descending ? "-reg-time" : "reg-time") : undefined
        }

        return axios
            .get<GetArtistsResult>(`${this.apiPath}/artists`, {params})
            .then(resp => resp.data)
    }

    getArtistDetails(artistId: string): Promise<Artist> {
        throw new Error()
        // return new Promise<Artist>({});
    }

    updateArtist(token: string, artistId: string, updater: ArtistUpdater): Promise<string> {
        const formData: any = new FormData();
        if (updater.artistIntro?.artTypes != null) {
            formData.append('artistIntro.artTypes', updater.artistIntro.artTypes);
        }
        if (updater.artistIntro?.yearOfDrawing != null) {
            formData.append('artistIntro.yearOfDrawing', updater.artistIntro.yearOfDrawing);
        }
        if (updater.artistBoard?.bannerImage != null) {
            formData.append('artistBoard.bannerImage', updater.artistBoard.bannerImage);
        }
        if (updater.artistBoard?.desc != null) {
            formData.append('artistBoard.desc', updater.artistBoard.desc);
        }

        const headers = {
            Authorization: 'Bearer ' + token,
        };

        return axios.patch<string>(`${this.apiPath}/artists/${artistId}`, formData, {
            headers
        }).then(resp => {
            return this.updateArtistMapper.mapFrom(resp.data)
        });
    }

    getArtistBookmarkIds(token: string): Promise<string[]> {
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        return axios.get<HttpGetArtistBookmarkIdsModel>(`${this.apiPath}/artist-bookmarks/ids`, {
            headers
        }).then(resp => {
            return this.getArtistBookmarkIdsMapper.mapFrom(resp.data)
        })
    }

    getArtistBookmarks(token: string, count: number, offset: number): Promise<GetArtistsResult> {
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const params = {
            offset,
            count
        }
        return axios
            .get<GetArtistsResult>(`${this.apiPath}`,
                {headers, params}
            )
            .then(resp => resp.data)
    }

    addBookmark(token: string, artistId: string): Promise<string> {
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        return axios
            .post<{ artistId: string }>(`${this.apiPath}/artist-bookmarks/${artistId}`,
                {headers}
            )
            .then(resp => resp.data.artistId)
    }

    removeBookmark(token: string, artistId: string): Promise<string> {
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        return axios
            .delete<{ artistId: string }>(`${this.apiPath}/artist-bookmarks/${artistId}}`,
                {headers}
            )
            .then(resp => resp.data.artistId)
    }


}

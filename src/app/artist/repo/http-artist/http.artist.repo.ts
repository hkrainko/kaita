import {ArtistRepo} from '../../../../domain/artist/artist.repo';
import {Artist} from '../../../../domain/artist/model/artist';
import {HttpGetArtistMapper, HttpGetArtistModel} from './resp/http.get-artist.model';
import {ArtistUpdater} from '../../../../domain/artist/model/artist-updater';
import {HttpUpdateArtistMapper} from './resp/http.update-artist.model';
import {injectable} from "inversify";
import axios from "axios";


@injectable()
export class HttpArtistRepo implements ArtistRepo {

    getArtistMapper = new HttpGetArtistMapper();
    updateArtistMapper = new HttpUpdateArtistMapper();

    apiPath = 'http://192.168.64.12:31398/api';

    getArtist(artistId: string): Promise<Artist> {
        return axios
            .get<HttpGetArtistModel>(`${this.apiPath}/artists/${artistId}`)
            .then(resp => {
                return this.getArtistMapper.mapFrom(resp.data)
            })
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


}

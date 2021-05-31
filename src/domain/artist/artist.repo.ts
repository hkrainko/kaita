import {Artist} from './model/artist';
import {ArtistUpdater} from './model/artist-updater';


export interface ArtistRepo {
    getArtist(artistId: string): Promise<Artist>;

    getArtistDetails(artistId: string): Promise<Artist>;

    updateArtist(token: string, artistId: string, updater: ArtistUpdater): Promise<string>;
}

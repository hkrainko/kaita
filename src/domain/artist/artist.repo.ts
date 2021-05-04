import {Artist} from './model/artist';
import {ArtistUpdater} from './model/artist-updater';


export abstract class ArtistRepo {
    abstract getArtist(artistId: string): Promise<Artist>;

    abstract getArtistDetails(artistId: string): Promise<Artist>;

    abstract updateArtist(token: string, artistId: string, updater: ArtistUpdater): Promise<string>;
}

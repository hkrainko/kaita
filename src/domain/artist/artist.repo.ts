import {Observable} from 'rxjs';
import {Artist} from './model/artist';
import {ArtistUpdater} from './model/artist-updater';


export abstract class ArtistRepo {
  abstract getArtist(artistId: string): Observable<Artist>;

  abstract getArtistDetails(artistId: string): Observable<Artist>;

  abstract updateArtist(token: string, artistId: string, updater: ArtistUpdater): Observable<string>;
}

import {Artwork} from './artwork';
import {Observable} from 'rxjs';
import {ArtworkFilter} from './model/artwork-filter';
import {ArtworkSorter} from './model/artwork-sorter';


export abstract class ArtworkRepo {
  abstract getArtworkById(apiToken: string, id: string): Observable<Artwork>;
  abstract getArtworks(apiToken: string, filter: ArtworkFilter, sorter: ArtworkSorter): Observable<Artwork[]>;
}

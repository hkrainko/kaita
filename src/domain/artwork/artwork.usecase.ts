import {Observable} from 'rxjs';
import {Artwork} from './artwork';
import {ArtworkFilter} from './model/artwork-filter';
import {ArtworkSorter} from './model/artwork-sorter';


export abstract class ArtworkUseCase {

  abstract getArtwork(id: string): Observable<Artwork>;

  abstract getArtworks(filter: ArtworkFilter, sorter: ArtworkSorter): Observable<Artwork[]>;

}

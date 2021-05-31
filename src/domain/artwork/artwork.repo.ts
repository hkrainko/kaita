import {Artwork} from './artwork';
import {ArtworkFilter} from './model/artwork-filter';
import {ArtworkSorter} from './model/artwork-sorter';
import GetArtworksResult from "./model/get-artworks-result";


export interface ArtworkRepo {
    getArtworkById(apiToken: string | undefined, id: string): Promise<Artwork>;

    getArtworks(apiToken: string | undefined, filter: ArtworkFilter, sorter: ArtworkSorter): Promise<GetArtworksResult>;
}

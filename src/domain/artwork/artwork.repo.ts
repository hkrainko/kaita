import {Artwork} from './artwork';
import {ArtworkFilter} from './model/artwork-filter';
import {ArtworkSorter} from './model/artwork-sorter';
import GetArtworksResult from "./model/get-artworks-result";
import {ArtworkUpdater} from "./model/artwork-updater";


export interface ArtworkRepo {
    getArtworkById(apiToken: string | undefined, id: string): Promise<Artwork>;

    getArtworks(apiToken: string | undefined, filter: ArtworkFilter, sorter: ArtworkSorter): Promise<GetArtworksResult>;

    updateArtwork(apiToken: string, updater: ArtworkUpdater): Promise<string>;
}

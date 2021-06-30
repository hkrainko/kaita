import {Artist} from './model/artist';
import {ArtistUpdater} from './model/artist-updater';
import {ArtistFilter} from "./model/artist-filter";
import {ArtistSorter} from "./model/artist-sorter";
import {GetArtistsResult} from "./model/get-artists-result";


export interface ArtistRepo {
    getArtist(artistId: string): Promise<Artist>

    getArtists(filter: ArtistFilter, sorter: ArtistSorter): Promise<GetArtistsResult>

    getArtistDetails(artistId: string): Promise<Artist>

    updateArtist(token: string, artistId: string, updater: ArtistUpdater): Promise<string>

    getArtistBookmarks(token: string, count: number, offset: number): Promise<GetArtistsResult>

    getArtistBookmarkIds(token: string): Promise<string[]>

    addBookmark(token: string, artistId: string): Promise<string>

    removeBookmark(token: string, artistId: string): Promise<string>
}

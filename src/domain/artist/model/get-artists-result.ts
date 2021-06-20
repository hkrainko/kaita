import {Artist} from "./artist";

export interface GetArtistsResult {
    artists: Artist[]
    count: number
    offset: number
}

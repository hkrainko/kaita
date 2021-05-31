import {Artwork} from "../artwork";

export default interface GetArtworksResult {
    artworks: Artwork[]
    offset: number
    count: number
    total: number
}

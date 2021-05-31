import {Artwork} from "../artwork";

export default interface GetArtworksResult {
    artistId: string
    artworks: Artwork[]
    offset: number
    fetchCount: number
    total: number
}

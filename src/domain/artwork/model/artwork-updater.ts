import {ArtworkState} from "../artwork";

export interface ArtworkUpdater {
    id: string
    title?: string
    textContent?: string
    state?: ArtworkState
}

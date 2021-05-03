import {Artist} from "../../../domain/artist/model/artist";


export interface ArtistState {
    allIds: string[]
    byId: {[id: string]: string}
}

const initialState: ArtistState = {
    allIds: [],
    byId: {}
}

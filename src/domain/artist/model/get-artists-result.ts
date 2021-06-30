import {Artist} from "./artist";
import {ResultPage} from "../../search/model/search-result";

export interface GetArtistsResult {
    page: ResultPage
    artists: Artist[]
}

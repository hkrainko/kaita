import {ArtistsSearchResult, SearchResultPage} from "../../../../../domain/search/model/search-result";
import {Artist} from "../../../../../domain/artist/model/artist";
import {Mapper} from "../../../../../domain/mapper";
import {SearchType} from "../../../../../domain/search/model/search-type";

export interface SearchArtistsRepoModel {
    page: SearchResultPage
    artists: Artist[]
}

export class SearchArtistsRepoModelMapper extends Mapper<SearchArtistsRepoModel, ArtistsSearchResult> {
    mapFrom(param: SearchArtistsRepoModel): ArtistsSearchResult {
        return {
            type: SearchType.Artists,
            page: param.page,
            records: param.artists
        };
    }

    mapTo(param: ArtistsSearchResult): SearchArtistsRepoModel {
        return {
            page: param.page,
            artists: param.records
        };
    }

}

import {ArtworksSearchResult, SearchResultPage} from "../../../../../domain/search/model/search-result";
import {Artwork} from "../../../../../domain/artwork/artwork";
import {Mapper} from "../../../../../domain/mapper";
import {SearchType} from "../../../../../domain/search/model/search-type";

export interface SearchArtworksRepoModel {
    page: SearchResultPage,
    artworks: Artwork[]
}

export class SearchArtworksRepoModelMapper extends Mapper<SearchArtworksRepoModel, ArtworksSearchResult> {
    mapFrom(param: SearchArtworksRepoModel): ArtworksSearchResult {
        return {
            type: SearchType.Artworks,
            page: param.page,
            records: param.artworks
        };
    }

    mapTo(param: ArtworksSearchResult): SearchArtworksRepoModel {
        return {
            page: param.page,
            artworks: param.records
        };
    }

}

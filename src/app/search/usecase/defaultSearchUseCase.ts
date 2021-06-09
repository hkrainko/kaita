import {SearchUseCase} from "../../../domain/search/search.usecase";
import {injectable} from "inversify";
import {SearchType} from "../../../domain/search/model/search-type";
import {OpenCommissionsSearchSelection} from "./model/openCommissionsSearchSelection";
import {ArtistsSearchSelection} from "./model/artistsSearchSelection";
import {ArtworksSearchSelection} from "./model/artworksSearchSelection";

@injectable()
export class DefaultSearchUseCase implements SearchUseCase {

    getSearchTypeName(type: SearchType): string {
        switch (type) {
            case SearchType.OpenCommissions:
                return "開放委托"
            case SearchType.Artists:
                return "繪師"
            case SearchType.Artworks:
                return "作品"
        }
    }

    getOpenCommissionsSearchSelection(): OpenCommissionsSearchSelection {
        return new OpenCommissionsSearchSelection()
    }

    getArtistsSearchSelection(): ArtistsSearchSelection {
        return new ArtistsSearchSelection()
    }

    getArtworksSearchSelection(): ArtworksSearchSelection {
        return new ArtworksSearchSelection()
    }

}

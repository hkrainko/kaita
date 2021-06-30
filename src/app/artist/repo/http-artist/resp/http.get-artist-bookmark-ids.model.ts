import {Mapper} from "../../../../../domain/mapper";

export interface HttpGetArtistBookmarkIdsModel {
    ids: string[]
}

export class HttpGetArtistBookmarkIdsMapper extends Mapper<HttpGetArtistBookmarkIdsModel, string[]> {
    mapFrom(param: HttpGetArtistBookmarkIdsModel): string[] {
        return param.ids;
    }

    mapTo(param: string[]): HttpGetArtistBookmarkIdsModel {
        return {
            ids: param
        };
    }
}

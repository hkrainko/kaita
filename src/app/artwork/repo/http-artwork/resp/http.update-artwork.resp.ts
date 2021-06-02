import {Mapper} from "../../../../../domain/mapper";

export interface HttpUpdateArtworkResp {
    id: string
}

export class HttpUpdateArtworkMapper extends Mapper<HttpUpdateArtworkResp, string> {
    mapFrom(param: HttpUpdateArtworkResp): string {
        return param.id;
    }

    mapTo(param: string): HttpUpdateArtworkResp {
        return {
            id: param
        };
    }
}

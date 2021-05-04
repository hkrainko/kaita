import {Mapper} from '../../../../../domain/mapper';

export interface HttpUpdateArtistModel {
  data: string;
}

export class HttpUpdateArtistMapper extends Mapper<string, string> {
  mapFrom(param: string): string {
    return param;
  }

  mapTo(param: string): string {
    return param;
  }
}

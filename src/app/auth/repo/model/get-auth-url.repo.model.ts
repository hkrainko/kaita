import {Mapper} from '../../../../domain/mapper';

export interface GetAuthUrlRepoModel {
  authUrl: string;
}

export class GetAuthUrlMapper extends Mapper<GetAuthUrlRepoModel, string>{
  mapFrom(param: GetAuthUrlRepoModel): string {
    return param.authUrl;
  }

  mapTo(param: string): GetAuthUrlRepoModel {
    return {
      authUrl: param
    };
  }
}

import {Mapper} from "../../../../domain/mapper";

export interface UpdateAuthUserRepoModel {
    userId: string;
}

export class UpdateAuthUserMapper extends Mapper<UpdateAuthUserRepoModel, string> {
    mapFrom(param: UpdateAuthUserRepoModel): string {
        return param.userId;
    }

    mapTo(param: string): UpdateAuthUserRepoModel {
        return {
            userId: param
        };
    }

}

import {Gender} from '../../../../domain/user/gender';
import {UserState} from '../../../../domain/user/user';
import {Mapper} from '../../../../domain/mapper';
import {AuthUser} from '../../../../domain/auth-user/model/auth-user';
import {AuthType} from "../../../../domain/auth/model/auth-type";


export interface GetAuthUserRepoModel {
    authId: string;
    userId: string;
    userName: string;
    authType: AuthType;
    apiToken: string;
    regToken: string;
    email?: string;
    birthday?: string;
    gender?: Gender;
    isArtist: boolean;
    profilePath?: string;
    state: UserState;
    regTime?: string;
}

export class GetAuthUserModelMapper extends Mapper<GetAuthUserRepoModel, AuthUser> {

    mapFrom(param: GetAuthUserRepoModel): AuthUser {
        return {
            apiToken: param.apiToken,
            authId: param.authId,
            authType: param.authType,
            birthday: param.birthday,
            email: param.email,
            gender: param.gender,
            isArtist: param.isArtist,
            profilePath: param.profilePath,
            regToken: param.regToken,
            state: param.state,
            userId: param.userId,
            userName: param.userName,
            regTime: param.regTime,
        };
    }

    mapTo(param: AuthUser): GetAuthUserRepoModel {
        return {
            apiToken: param.apiToken,
            authId: param.authId,
            authType: param.authType,
            birthday: param.birthday,
            email: param.email,
            gender: param.gender,
            isArtist: param.isArtist,
            profilePath: param.profilePath,
            regToken: param.regToken,
            state: param.state,
            userId: param.userId,
            userName: param.userName,
            regTime: param.regTime,
        };
    }

}

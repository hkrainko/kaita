import {Gender} from '../../../../domain/user/gender';
import {Mapper} from '../../../../domain/mapper';
import {AuthUser} from '../../../../domain/auth-user/model/auth-user';
import {UserState} from '../../../../domain/user/user';
import {AuthType} from "../../../../domain/auth/model/auth-type";

export interface AuthUserRepoModel {
  authId: string;
  userId: string;
  userName: string;
  authType: AuthType;
  apiToken: string;
  regToken: string;
  email?: string;
  birthday?: string;
  gender?: Gender;
  profilePath?: string;
  isArtist: boolean;
  state: UserState;
  regTime?: string;
}

export class AuthUserMapper extends Mapper<AuthUserRepoModel, AuthUser> {
  mapFrom(param: AuthUserRepoModel): AuthUser {
    return {
      apiToken: param.apiToken,
      userId: param.userId,
      authType: param.authType,
      birthday: param.birthday,
      email: param.email,
      gender: param.gender,
      authId: param.authId,
      regToken: param.regToken,
      userName: param.userName,
      profilePath: param.profilePath,
      isArtist: param.isArtist,
      state: param.state,
      regTime: param.regTime,
    };
  }

  mapTo(param: AuthUser): AuthUserRepoModel {
    return {
      apiToken: param.apiToken,
      userId: param.userId,
      authType: param.authType,
      birthday: param.birthday,
      email: param.email,
      gender: param.gender,
      authId: param.authId,
      regToken: param.regToken,
      userName: param.userName,
      profilePath: param.profilePath,
      isArtist: param.isArtist,
      state: param.state,
      regTime: param.regTime,
    };
  }

}

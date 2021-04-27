// AuthID   string `json:"authId"`
// UserName string `json:"userName"`
// AuthType string `json:"authType"`
// APIToken string `json:"apiToken"`
// RegToken string `json:"regToken"`
// Email    string `json:"email"`
// Birthday string `json:"birthday"`
// Gender   string `json:"gender"`
// PhotoURL string `json:"photoUrl"`
// State    string `json:"state"`

import {AuthType} from '../../../../domain/auth/model/auth-type';
import {Gender} from '../../../../domain/user/gender';
import {Mapper} from '../../../../domain/mapper';
import {UserState} from '../../../../domain/user/user';
import {AuthCallback} from '../../../../domain/auth/model/auth-callback';

export interface AuthCallbackRepoModel {
  authId: string;
  userId: string;
  userName: string;
  authType: AuthType;
  apiToken: string;
  regToken: string;
  email: string;
  birthday: string;
  gender: Gender;
  profilePath: string | undefined;
  oAuthServiceProfileUrl: string | undefined;
  isArtist: boolean;
  state: UserState;
  regTime: Date;
  lastUpdateTime: Date | undefined;
}

export class AuthCallbackMapper extends Mapper<AuthCallbackRepoModel, AuthCallback> {
  mapFrom(param: AuthCallbackRepoModel): AuthCallback {
    return new AuthCallback(
      param.authId,
      param.userId,
      param.userName,
      param.authType,
      param.apiToken,
      param.regToken,
      param.email,
      param.birthday,
      param.gender,
      param.profilePath,
      param.oAuthServiceProfileUrl ? new URL(param.oAuthServiceProfileUrl) : undefined,
      param.isArtist,
      param.state,
      param.regTime,
      param.lastUpdateTime,
    );
  }

  mapTo(param: AuthCallback): AuthCallbackRepoModel {
    return {
      authId: param.authId,
      userId: param.userId,
      userName: param.userName,
      authType: param.authType,
      apiToken: param.apiToken,
      regToken: param.regToken,
      email: param.email,
      birthday: param.birthday,
      gender: param.gender,
      profilePath: param.profilePath,
      oAuthServiceProfileUrl: param.oAuthServiceProfileUrl?.toString(),
      isArtist: param.isArtist,
      state: param.state,
      regTime: param.regTime,
      lastUpdateTime: param.lastUpdateTime,
    };
  }
}

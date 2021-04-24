import {AuthType} from '../auth-type';
import {Gender} from '../../user/gender';
import {UserState} from '../../user/user';
import {AuthUser} from '../../auth-user/auth-user';

export class AuthCallback implements AuthUser {
  authId: string;
  userId: string;
  userName: string;
  authType: AuthType;
  apiToken: string;
  regToken: string;
  email: string;
  birthday: string;
  gender: Gender;
  profilePath?: string;
  oAuthServiceProfileUrl?: URL;
  isArtist: boolean;
  state: UserState;
  regTime: Date;
  lastUpdateTime?: Date;

  constructor(
    authId: string,
    userId: string,
    userName: string,
    authType: AuthType,
    apiToken: string,
    regToken: string,
    email: string,
    birthday: string,
    gender: Gender,
    profilePath: string | undefined,
    oAuthServiceProfileUrl: URL | undefined,
    isArtist: boolean,
    state: UserState,
    regTime: Date,
    lastUpdateTime: Date | undefined,
  ) {
    this.authId = authId;
    this.userId = userId;
    this.userName = userName;
    this.authType = authType;
    this.apiToken = apiToken;
    this.regToken = regToken;
    this.email = email;
    this.birthday = birthday;
    this.gender = gender;
    this.profilePath = profilePath;
    this.oAuthServiceProfileUrl = oAuthServiceProfileUrl;
    this.isArtist = isArtist;
    this.state = state;
    this.regTime = regTime;
    this.lastUpdateTime = lastUpdateTime;
  }

  toAuthUser(): AuthUser | undefined {
    return {
      apiToken: this.apiToken,
      authId: this.authId,
      userId: this.userId,
      authType: this.authType,
      birthday: this.birthday,
      email: this.email,
      gender: this.gender,
      isArtist: this.isArtist,
      profilePath: this.profilePath,
      regToken: this.regToken,
      state: this.state,
      userName: this.userName,
      regTime: this.regTime,
      lastUpdateTime: this.lastUpdateTime,
    };
  }
}

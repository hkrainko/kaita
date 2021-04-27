import {AuthType} from './auth-type';
import {Gender} from '../../user/gender';
import {UserState} from '../../user/user';
import {AuthUser} from '../../auth-user/auth-user';

export interface AuthCallback extends AuthUser {
  userId: string;
  userName: string;
  email: string;
  birthday: string;
  gender: Gender;
  profilePath?: string;
  oAuthServiceProfileUrl?: string;
  isArtist: boolean;
  state: UserState;
  regTime?: string;
  lastUpdateTime?: string;
}

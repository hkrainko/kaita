import {AuthType} from '../auth/auth-type';
import {Gender} from '../user/gender';
import {User, UserState} from '../user/user';

export interface AuthUser extends User {
  authId: string;
  authType: AuthType;
  apiToken: string;
  regToken: string;
}



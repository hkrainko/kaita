import {AuthType} from '../../auth/model/auth-type';
import {User} from '../../user/user';

export interface AuthUser extends User {
  authId: string;
  authType: AuthType;
  apiToken: string;
  regToken: string;
}



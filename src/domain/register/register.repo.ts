import {RegisterInfo} from './model/register-info';
import {AuthUser} from '../auth-user/model/auth-user';

export interface RegisterRepo {
  register(regInfo: RegisterInfo, regToken: string): Promise<AuthUser>;
}

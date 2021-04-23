import {RegisterInfo} from './model/register-info';
import {Observable} from 'rxjs';
import {AuthCallback} from '../auth/model/auth-callback';
import {AuthUser} from '../auth-user/auth-user';


export abstract class RegisterRepo {
  abstract register(regInfo: RegisterInfo, regToken: string): Observable<AuthUser>;
}

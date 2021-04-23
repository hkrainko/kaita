import {RegisterInfo} from './model/register-info';
import {Observable} from 'rxjs';
import {AuthUser} from '../auth-user/auth-user';

export abstract class RegisterUseCase {
  abstract register(registerInfo: RegisterInfo, regToken: string): Observable<AuthUser>;
}

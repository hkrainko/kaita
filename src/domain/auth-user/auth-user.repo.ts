import {AuthUser} from './auth-user';
import {BehaviorSubject, Observable} from 'rxjs';


export abstract class AuthUserRepo {
  abstract getAuthUser(): BehaviorSubject<AuthUser>;
  abstract setAuthUser(authUser?: AuthUser): any;
  abstract refreshAuthUser(): Observable<AuthUser>;
}

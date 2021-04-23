import {AuthType} from './auth-type';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthCallback} from './model/auth-callback';
import {AuthUser} from '../auth-user/auth-user';

export abstract class AuthUseCase {
  abstract getAuthUrl(type: AuthType): Observable<string>;
  abstract authCallback(type: AuthType, code: string, state: string): Observable<AuthCallback>;
  abstract getAuthUser(): BehaviorSubject<AuthUser>;
  abstract refreshAuthUser(): Observable<AuthUser>;
  abstract logout(): void;
}

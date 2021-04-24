import {AuthType} from './auth-type';
import {Observable} from 'rxjs';
import {AuthCallback} from './model/auth-callback';


export abstract class AuthRepo {
    abstract getAuthUrl(type: AuthType): Promise<string>
    abstract authCallback(type: AuthType, code: string, state: string): Observable<AuthCallback>
}

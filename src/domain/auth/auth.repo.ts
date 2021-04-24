import {AuthType} from './auth-type';
import {AuthCallback} from './model/auth-callback';

export abstract class AuthRepo {
    abstract getAuthUrl(type: AuthType): Promise<string>
    abstract authCallback(type: AuthType, code: string, state: string): Promise<AuthCallback>
}

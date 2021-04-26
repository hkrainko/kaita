import {AuthType} from './auth-type';
import {AuthCallback} from './model/auth-callback';

export interface AuthRepo {
    getAuthUrl(type: AuthType): Promise<string>
    authCallback(type: AuthType, code: string, state: string): Promise<AuthCallback>
}

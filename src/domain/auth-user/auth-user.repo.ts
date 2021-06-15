import {AuthUser} from './model/auth-user';
import {AuthUserUpdater} from "./model/auth-user-updater";


export interface AuthUserRepo {
    getAuthUser(token: string): Promise<AuthUser>;

    updateAuthUser(token: string, updater: AuthUserUpdater): Promise<string>;
}

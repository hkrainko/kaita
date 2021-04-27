import {AuthType} from './model/auth-type';

export default interface AuthUseCase {
    getAuthUrl(type: AuthType): Promise<string>;
}

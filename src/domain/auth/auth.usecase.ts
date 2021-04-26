import {AuthType} from './auth-type';

export default interface AuthUseCase {
    getAuthUrl(type: AuthType): Promise<string>;
}

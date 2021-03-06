import {AuthType} from '../../../domain/auth/model/auth-type';
import {AuthRepo} from '../../../domain/auth/auth.repo';
import {GetAuthUrlMapper, GetAuthUrlRepoModel} from './model/get-auth-url.repo.model';
import {AuthCallbackMapper, AuthCallbackRepoModel} from './model/auth-callback.repo.model';
import {AuthCallback} from '../../../domain/auth/model/auth-callback';
import axios from "axios";
import {injectable} from "inversify";
import config from "../../config";

@injectable()
export class HttpAuthRepo implements AuthRepo {

    getAuthUrlMapper = new GetAuthUrlMapper();
    authCallbackMapper = new AuthCallbackMapper();

    apiPath = config.API_PATH;

    getText(anyStr: string): string {
        return `echo ${anyStr}`
    }

    getAuthUrl(type: AuthType): Promise<string> {

        return axios
            .get<GetAuthUrlRepoModel>(`${this.apiPath}/auth/url?type=${type}`)
            .then(response => {
                return this.getAuthUrlMapper.mapFrom(response.data)
            })
    }

    authCallback(type: AuthType, code: string, state: string): Promise<AuthCallback> {
        return axios
            .get<AuthCallbackRepoModel>(`${this.apiPath}/auth/callback?auth_type=${type}&code=${code}&state=${state}`)
            .then(response => {
                console.log(JSON.stringify(response.data))
                return this.authCallbackMapper.mapFrom(response.data)
            })
    }
}

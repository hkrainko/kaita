import {AuthType} from '../../../domain/auth/auth-type';
import {Observable} from 'rxjs';
import {AuthRepo} from '../../../domain/auth/auth.repo';
import {GetAuthUrlRepoModel, GetAuthUrlMapper} from './model/get-auth-url.repo.model';
import {AuthCallbackMapper, AuthCallbackRepoModel} from './model/auth-callback.repo.model';
import {AuthCallback} from '../../../domain/auth/model/auth-callback';
import axios, {AxiosStatic} from "axios";

export class HttpAuthRepo extends AuthRepo {

    private http: AxiosStatic
    getAuthUrlMapper = new GetAuthUrlMapper();
    authCallbackMapper = new AuthCallbackMapper();

    apiPath = 'http://192.168.64.12:31398/api';

    constructor() {
        super();
        this.http = axios
    }

    getText(anyStr: string): string {
        return `echo ${anyStr}`
    }

    getAuthUrl(type: AuthType): Promise<string> {

        return this.http
            .get<GetAuthUrlRepoModel>(`${this.apiPath}/auth/url?type=${type}`)
            .then(response => {
                return this.getAuthUrlMapper.mapFrom(response.data)
            })
    }

    authCallback(type: AuthType, code: string, state: string): Promise<AuthCallback> {
        return this.http
            .get<AuthCallbackRepoModel>(`${this.apiPath}/auth/callback?auth_type=${type}&code=${code}&state=${state}`)
            .then(response => {
                return this.authCallbackMapper.mapFrom(response.data)
            })
    }
}

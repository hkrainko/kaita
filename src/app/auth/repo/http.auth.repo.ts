import {AuthType} from '../../../domain/auth/auth-type';
import {Observable} from 'rxjs';
import {AuthRepo} from '../../../domain/auth/auth.repo';
import {GetAuthUrlRepoModel, GetAuthUrlMapper} from './model/get-auth-url.repo.model';
import {map} from 'rxjs/operators';
import {AuthCallbackMapper, AuthCallbackRepoModel} from './model/auth-callback.repo.model';
import {AuthCallback} from '../../../domain/auth/model/auth-callback';
import {AxiosStatic} from "axios";

export class HttpAuthRepo extends AuthRepo {

    getAuthUrlMapper = new GetAuthUrlMapper();
    authCallbackMapper = new AuthCallbackMapper();

    apiPath = 'http://localhost:8080';

    constructor(
        private http: AxiosStatic
    ) {
        super();
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

    authCallback(type: AuthType, code: string, state: string): Observable<AuthCallback> {
        return new Observable()
        // return this.http
        //   .get<AuthCallbackRepoModel>(`${this.apiPath}/auth/callback?auth_type=${type}&code=${code}&state=${state}`)
        //   .pipe(map(
        //     this.authCallbackMapper.mapFrom
        //   ));
    }
}

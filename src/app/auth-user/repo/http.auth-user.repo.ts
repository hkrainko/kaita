import {AuthUserRepo} from "../../../domain/auth-user/auth-user.repo";
import {AuthUser} from "../../../domain/auth-user/model/auth-user";
import {AuthUserUpdater} from "../../../domain/auth-user/model/auth-user-updater";
import {GetAuthUserModelMapper, GetAuthUserRepoModel} from "./model/get-auth-user.repo.model";
import axios from "axios";
import {UpdateAuthUserMapper, UpdateAuthUserRepoModel} from "./model/update-auth-user.repo.model";


export class HttpAuthUserRepo implements AuthUserRepo {

    apiPath = 'http://192.168.64.12:31398/api';

    getAuthUserModelMapper = new GetAuthUserModelMapper()
    updateAuthUserMapper = new UpdateAuthUserMapper()

    getAuthUser(token: string): Promise<AuthUser> {
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        return axios
            .get<GetAuthUserRepoModel>(
                `${this.apiPath}/user/me`,
                {headers},
            )
            .then(resp => {
                return this.getAuthUserModelMapper.mapFrom(resp.data)
            })
    }

    updateAuthUser(token: string, updater: AuthUserUpdater): Promise<string> {
        const url = `${this.apiPath}/user/me`;
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData: any = new FormData();
        formData.append('userId', updater.userId)
        if (updater.userName) {
            formData.append('userName', updater.userName)
        }
        if (updater.profileFile) {
            formData.append('profileFile', updater.profileFile)
        }

        return axios
            .patch<UpdateAuthUserRepoModel>(url, formData, {headers})
            .then(resp => {
                return this.updateAuthUserMapper.mapFrom(resp.data)
            })
    }

}

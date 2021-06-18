import {AuthUserRepo} from "../../../domain/auth-user/auth-user.repo";
import {AuthUser} from "../../../domain/auth-user/model/auth-user";
import {AuthUserUpdater} from "../../../domain/auth-user/model/auth-user-updater";
import {GetAuthUserModelMapper, GetAuthUserRepoModel} from "./model/get-auth-user.repo.model";
import axios from "axios";
import {UpdateAuthUserMapper, UpdateAuthUserRepoModel} from "./model/update-auth-user.repo.model";
import config from "../../config";


export class HttpAuthUserRepo implements AuthUserRepo {

    apiPath = config.API_PATH;

    getAuthUserModelMapper = new GetAuthUserModelMapper()
    updateAuthUserMapper = new UpdateAuthUserMapper()

    getAuthUser(token: string): Promise<AuthUser> {
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        return axios
            .get<GetAuthUserRepoModel>(
                `${this.apiPath}/users/me`,
                {headers},
            )
            .then(resp => {
                return this.getAuthUserModelMapper.mapFrom(resp.data)
            })
    }

    updateAuthUser(token: string, updater: AuthUserUpdater): Promise<string> {
        const url = `${this.apiPath}/users/me`;
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData: any = new FormData();
        formData.append('userId', updater.userId)
        if (updater.userName) {
            formData.append('userName', updater.userName)
        }
        if (updater.profileFile) {
            formData.append('profile', updater.profileFile)
        }

        return axios
            .patch<UpdateAuthUserRepoModel>(url, formData, {headers})
            .then(resp => {
                return this.updateAuthUserMapper.mapFrom(resp.data)
            })
    }

}

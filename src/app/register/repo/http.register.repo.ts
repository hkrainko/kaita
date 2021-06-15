import {RegisterRepo} from '../../../domain/register/register.repo';
import {RegisterInfo} from '../../../domain/register/model/register-info';
import {AuthUser} from '../../../domain/auth-user/model/auth-user';
import {AuthUserMapper, AuthUserRepoModel} from './model/auth-user.repo.model';
import {injectable} from "inversify";
import axios from "axios";

@injectable()
export class HttpRegisterRepo implements RegisterRepo {

    authUserMapper = new AuthUserMapper();

    apiPath = 'http://192.168.64.12:31398/api';

    register(regInfo: RegisterInfo, regToken: string): Promise<AuthUser> {

        const formData: any = new FormData();
        formData.append('artistIntro', regInfo.artistIntro);
        formData.append('authId', regInfo.authId);
        formData.append('birthday', regInfo.birthday);
        formData.append('displayName', regInfo.displayName);
        formData.append('email', regInfo.email);
        formData.append('gender', regInfo.gender);
        formData.append('profile', regInfo.profile);
        formData.append('regAsArtist', regInfo.regAsArtist ? 'Y' : 'N');
        formData.append('userId', regInfo.userId);
        if (regInfo.regAsArtist) {
            formData.append('yearOfDrawing', 0);
            formData.append('artTypes', 'NA');

            // Remove: may not use.
            // formData.append('yearOfDrawing', regInfo.artistIntro.yearOfDrawing);
            // regInfo.artistIntro.artTypes.forEach(value => {
            //   formData.append('artTypes', value);
            // });
        }

        const headers = {
            Authorization: 'Bearer ' + regToken,
        };

        return axios
            .post<AuthUserRepoModel>(`${this.apiPath}/reg`, formData, {
                headers,
            })
            .then(resp => {
                return this.authUserMapper.mapFrom(resp.data)
            });
    }

}

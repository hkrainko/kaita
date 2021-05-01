import {RegisterRepo} from '../../../domain/register/register.repo';
import {RegisterInfo} from '../../../domain/register/model/register-info';
import {Observable, throwError} from 'rxjs';
import {AuthUser} from '../../../domain/auth-user/auth-user';
import {AuthUserMapper, AuthUserRepoModel} from './model/auth-user.repo.model';
import {catchError, map} from 'rxjs/operators';
import {RegisterRepoModel} from './model/register.repo.model';
import {
  RegisterErrorAuthIDAlreadyRegister,
  RegisterErrorDuplicated,
  RegisterErrorUnknown
} from '../../../domain/register/model/register-error';
import {injectable} from "inversify";
import axios, {AxiosStatic} from "axios";

@injectable()
export class HttpRegisterRepo implements RegisterRepo {

  authUserMapper = new AuthUserMapper();

  apiPath = 'http://192.168.64.12:31398/api';

  private http = axios

  register(regInfo: RegisterInfo, regToken: string): Promise<AuthUser> {
    const httpRegInfo: RegisterRepoModel = {
      artistIntro: regInfo.artistIntro,
      authId: regInfo.authId,
      birthday: regInfo.birthday,
      displayName: regInfo.displayName,
      email: regInfo.email,
      gender: regInfo.gender,
      profile: regInfo.profile,
      regAsArtist: regInfo.regAsArtist,
      userId: regInfo.userId,
      regToken
    };

    console.log(`post /reg/registration ${JSON.stringify(httpRegInfo)}`);

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

    const headers = new Headers({
      Authorization: 'Bearer ' + regToken,
    });

    return this.http
      .post<AuthUserRepoModel>(`${this.apiPath}/reg`, formData, {
        headers
      })
        .then(resp => {
          console.log(JSON.stringify(resp.data))
          return this.authUserMapper.mapFrom(resp.data)
        });
      // .pipe(
      //   catchError( err => {
      //     console.log(`err:${JSON.stringify(err)}`);
      //     switch (err.status) {
      //       case 409:
      //         return throwError(RegisterErrorDuplicated);
      //       case 403:
      //         return throwError(RegisterErrorAuthIDAlreadyRegister);
      //       default:
      //         return throwError(RegisterErrorUnknown);
      //     }
      //   }),
      //   map(this.authUserMapper.mapFrom)
      // );
  }

}

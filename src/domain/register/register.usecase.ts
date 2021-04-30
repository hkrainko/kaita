import {RegisterInfo} from './model/register-info';
import {AuthUser} from '../auth-user/auth-user';
import {Gender} from "../user/gender";

export interface RegisterUseCase {
  register(registerInfo: RegisterInfo, regToken: string): Promise<AuthUser>;
  isUserIdValid(value: string): boolean;
  isDisplayNameValid(value: string): boolean;
  isEmailValid(value: string): boolean;
  isBirthdayValid(value: Date): boolean;
  isGenderValid(value: Gender): boolean;
}

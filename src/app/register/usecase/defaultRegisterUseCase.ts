import {RegisterUseCase} from "../../../domain/register/register.usecase";
import {AuthUser} from "../../../domain/auth-user/auth-user";
import {RegisterInfo} from "../../../domain/register/model/register-info";
import {Gender} from "../../../domain/user/gender";
import {injectable} from "inversify";

@injectable()
export class DefaultRegisterUseCase implements RegisterUseCase {
    register(registerInfo: RegisterInfo, regToken: string): Promise<AuthUser> {
        return new Promise<AuthUser>(()=>{})
    }

    isUserIdValid(value: string): boolean {
        if (value.length > 12 || value.length < 4) {
            return false
        }
        const regexp = new RegExp(/^[a-z0-9._]+$/);
        return regexp.test(value)
    }

    isDisplayNameValid(value: string): boolean {
        return !(value.length > 20 || value.length < 2);
    }

    isEmailValid(value: string): boolean {
        const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(value);
    }

    isBirthdayValid(value: Date): boolean {
        return true
    }

    isGenderValid(value: Gender): boolean {
        switch (value) {
            case Gender.Male || Gender.Female:
                return true
            default:
                return false
        }
    }

}

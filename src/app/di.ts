import {HttpAuthRepo} from "./auth/repo/http.auth.repo";
import {AuthRepo} from "../domain/auth/auth.repo";
import {RegisterRepo} from "../domain/register/register.repo";
import {HttpRegisterRepo} from "./register/repo/http.register.repo";

export default class AppDependency {

    authRepo: AuthRepo
    registerRepo: RegisterRepo

    constructor() {
        this.authRepo = new HttpAuthRepo()
        this.registerRepo = new HttpRegisterRepo()
    }
}

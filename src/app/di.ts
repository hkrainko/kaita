import {HttpAuthRepo} from "./auth/repo/http.auth.repo";
import {AuthRepo} from "../domain/auth/auth.repo";

export default class AppDependency {

    authRepo: AuthRepo

    constructor() {
        this.authRepo = new HttpAuthRepo()
    }
}

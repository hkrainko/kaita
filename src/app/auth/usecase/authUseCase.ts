import {AuthRepo} from "../../../domain/auth/auth.repo";
import {AuthType} from "../../../domain/auth/model/auth-type";
import {injectable} from "inversify";
import AuthUseCase from "../../../domain/auth/auth.usecase";
import {TYPES} from "../../../types";
import {container} from "../../../inversify.config";

@injectable()
export class DefaultAuthUseCase implements AuthUseCase {

    private authRepo: AuthRepo;

    constructor(
    ) {
        this.authRepo = container.get<AuthRepo>(TYPES.AuthRepo)
    }

    getAuthUrl(type: AuthType): Promise<string> {
        return this.authRepo.getAuthUrl(type);
    }

}

import {Container} from "inversify";
import {TYPES} from "./types";
import {DefaultAuthUseCase} from "./app/auth/usecase/authUseCase";
import AuthUseCase from "./domain/auth/auth.usecase";
import {HttpAuthRepo} from "./app/auth/repo/http.auth.repo";
import {AuthRepo} from "./domain/auth/auth.repo";

const container = new Container();
container.bind<AuthRepo>(TYPES.AuthRepo).to(HttpAuthRepo);
container.bind<AuthUseCase>(TYPES.AuthUseCase).to(DefaultAuthUseCase);

export {container};

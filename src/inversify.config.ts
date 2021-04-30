import {Container} from "inversify";
import {TYPES} from "./types";
import {DefaultAuthUseCase} from "./app/auth/usecase/defaultAuthUseCase";
import AuthUseCase from "./domain/auth/auth.usecase";
import {HttpAuthRepo} from "./app/auth/repo/http.auth.repo";
import {AuthRepo} from "./domain/auth/auth.repo";
import {RegisterUseCase} from "./domain/register/register.usecase";
import {DefaultRegisterUseCase} from "./app/register/usecase/defaultRegisterUseCase";

const container = new Container();
container.bind<AuthRepo>(TYPES.AuthRepo).to(HttpAuthRepo);
container.bind<AuthUseCase>(TYPES.AuthUseCase).to(DefaultAuthUseCase);
container.bind<RegisterUseCase>(TYPES.RegisterUseCase).to(DefaultRegisterUseCase);

export {container};

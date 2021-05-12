import {Container} from "inversify";
import {TYPES} from "./types";
import {DefaultAuthUseCase} from "./app/auth/usecase/defaultAuthUseCase";
import AuthUseCase from "./domain/auth/auth.usecase";
import {HttpAuthRepo} from "./app/auth/repo/http.auth.repo";
import {AuthRepo} from "./domain/auth/auth.repo";
import {RegisterUseCase} from "./domain/register/register.usecase";
import {DefaultRegisterUseCase} from "./app/register/usecase/defaultRegisterUseCase";
import {OpenCommissionUseCase} from "./domain/open-commission/open-commission.usecase";
import DefaultOpenCommissionUseCase from "./app/open-commission/usecase/defaultOpenCommissionUseCase";
import {CommissionUseCase} from "./domain/commission/commission.usecase";
import DefaultCommissionUseCase from "./app/commission/usecase/defaultCommissionUseCase";

const container = new Container();
container.bind<AuthRepo>(TYPES.AuthRepo).to(HttpAuthRepo);
container.bind<AuthUseCase>(TYPES.AuthUseCase).to(DefaultAuthUseCase);
container.bind<RegisterUseCase>(TYPES.RegisterUseCase).to(DefaultRegisterUseCase);
container.bind<OpenCommissionUseCase>(TYPES.OpenCommissionUseCase).to(DefaultOpenCommissionUseCase);
container.bind<CommissionUseCase>(TYPES.CommissionUseCase).to(DefaultCommissionUseCase);

export {container};

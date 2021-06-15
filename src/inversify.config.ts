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
import {CommissionRepo} from "./domain/commission/commission.repo";
import {HttpCommissionRepo} from "./app/commission/repo/http-commission/http.commission.repo";
import {OpenCommissionRepo} from "./domain/open-commission/open-commission.repo";
import {HttpOpenCommissionRepo} from "./app/open-commission/repo/http/http.open-commission.repo";
import {ArtworkUseCase} from "./domain/artwork/artwork.usecase";
import {DefaultArtworkUseCase} from "./app/artwork/usecase/default.artwork.usecase";
import {ArtworkRepo} from "./domain/artwork/artwork.repo";
import {HttpArtworkRepo} from "./app/artwork/repo/http-artwork/http.artwork.repo";
import {SearchUseCase} from "./domain/search/search.usecase";
import {DefaultSearchUseCase} from "./app/search/usecase/defaultSearchUseCase";
import {SearchRepo} from "./domain/search/search.repo";
import {HttpSearchRepo} from "./app/search/repo/http/http.search.repo";
import {AuthUserRepo} from "./domain/auth-user/auth-user.repo";
import {HttpAuthUserRepo} from "./app/auth-user/repo/http.auth-user.repo";

const container = new Container()
container.bind<AuthRepo>(TYPES.AuthRepo).to(HttpAuthRepo)
container.bind<AuthUseCase>(TYPES.AuthUseCase).to(DefaultAuthUseCase)
container.bind<RegisterUseCase>(TYPES.RegisterUseCase).to(DefaultRegisterUseCase)
container.bind<OpenCommissionUseCase>(TYPES.OpenCommissionUseCase).to(DefaultOpenCommissionUseCase)
container.bind<OpenCommissionRepo>(TYPES.OpenCommissionRepo).to(HttpOpenCommissionRepo)
container.bind<CommissionUseCase>(TYPES.CommissionUseCase).to(DefaultCommissionUseCase)
container.bind<CommissionRepo>(TYPES.CommissionRepo).to(HttpCommissionRepo)
container.bind<ArtworkUseCase>(TYPES.ArtworkUseCase).to(DefaultArtworkUseCase)
container.bind<ArtworkRepo>(TYPES.ArtworkRepo).to(HttpArtworkRepo)
container.bind<SearchUseCase>(TYPES.SearchUseCase).to(DefaultSearchUseCase)
container.bind<SearchRepo>(TYPES.SearchRepo).to(HttpSearchRepo)
container.bind<AuthUserRepo>(TYPES.AuthUserRepo).to(HttpAuthUserRepo)


export {container};

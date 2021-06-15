import {HttpAuthRepo} from "./auth/repo/http.auth.repo";
import {AuthRepo} from "../domain/auth/auth.repo";
import {RegisterRepo} from "../domain/register/register.repo";
import {HttpRegisterRepo} from "./register/repo/http.register.repo";
import {ArtistRepo} from "../domain/artist/artist.repo";
import {HttpArtistRepo} from "./artist/repo/http-artist/http.artist.repo";
import {OpenCommissionRepo} from "../domain/open-commission/open-commission.repo";
import {HttpOpenCommissionRepo} from "./open-commission/repo/http/http.open-commission.repo";
import {CommissionRepo} from "../domain/commission/commission.repo";
import {HttpCommissionRepo} from "./commission/repo/http-commission/http.commission.repo";
import {ArtworkRepo} from "../domain/artwork/artwork.repo";
import {HttpArtworkRepo} from "./artwork/repo/http-artwork/http.artwork.repo";
import {SearchRepo} from "../domain/search/search.repo";
import {HttpSearchRepo} from "./search/repo/http/http.search.repo";
import {AuthUserRepo} from "../domain/auth-user/auth-user.repo";
import {HttpAuthUserRepo} from "./auth-user/repo/http.auth-user.repo";

export default class AppDependency {

    authRepo: AuthRepo
    registerRepo: RegisterRepo
    artistRepo: ArtistRepo
    openCommRepo: OpenCommissionRepo
    commRepo: CommissionRepo
    artworkRepo: ArtworkRepo
    searchRepo: SearchRepo
    authUserRepo: AuthUserRepo

    constructor() {
        this.authRepo = new HttpAuthRepo()
        this.registerRepo = new HttpRegisterRepo()
        this.artistRepo = new HttpArtistRepo()
        this.openCommRepo = new HttpOpenCommissionRepo()
        this.commRepo = new HttpCommissionRepo()
        this.artworkRepo = new HttpArtworkRepo()
        this.searchRepo = new HttpSearchRepo()
        this.authUserRepo = new HttpAuthUserRepo()
    }
}

import {HttpAuthRepo} from "./auth/repo/http.auth.repo";
import {AuthRepo} from "../domain/auth/auth.repo";
import {RegisterRepo} from "../domain/register/register.repo";
import {HttpRegisterRepo} from "./register/repo/http.register.repo";
import {ArtistRepo} from "../domain/artist/artist.repo";
import {HttpArtistRepo} from "./artist/repo/http-artist/http.artist.repo";

export default class AppDependency {

    authRepo: AuthRepo
    registerRepo: RegisterRepo
    artistRepo: ArtistRepo

    constructor() {
        this.authRepo = new HttpAuthRepo()
        this.registerRepo = new HttpRegisterRepo()
        this.artistRepo = new HttpArtistRepo()
    }
}

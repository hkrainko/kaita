export abstract class ArtistError extends Error {

}

export class ArtistErrorNotFound extends ArtistError {
}

export class ArtistErrorUnknown extends ArtistError {
}

export class ArtistErrorUnAuth extends ArtistError {
}

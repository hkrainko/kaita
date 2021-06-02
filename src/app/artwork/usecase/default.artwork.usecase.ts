import {ArtworkUseCase} from "../../../domain/artwork/artwork.usecase";
import {injectable} from "inversify";

@injectable()
export class DefaultArtworkUseCase implements ArtworkUseCase {

    isTitleValid(value: string): boolean {
        return true;
    }

    isTextContentValid(value: string): boolean {
        return true;
    }


}

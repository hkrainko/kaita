export interface ArtworkUseCase {

    isTitleValid(value: string): boolean

    isTextContentValid(value: string): boolean
}

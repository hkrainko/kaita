import {SearchUseCase} from "../../../domain/search/search.usecase";
import {injectable} from "inversify";

@injectable()
export class DefaultSearchUseCase implements SearchUseCase {

    isOpenCommissionPriceValid(value: number[]): boolean {
        return true;
    }

}

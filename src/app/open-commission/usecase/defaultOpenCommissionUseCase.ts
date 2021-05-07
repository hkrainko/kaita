import {OpenCommissionUseCase} from "../../../domain/open-commission/open-commission.usecase";
import {injectable} from "inversify";
import {Currency, Price} from "../../../domain/price/price";

@injectable()
export default class DefaultOpenCommissionUseCase implements OpenCommissionUseCase {

    isTitleValid(value: string): boolean {
        return true;
    }

    isDayNeedValid(value: number): boolean {
        return true;
    }

    isDepositRuleValid(value: string): boolean {
        return true;
    }

    isDescValid(value: string): boolean {
        return true;
    }

    isMinPriceAmountValid(value: number): boolean {
        return true;
    }

    isMinPriceCurrencyValid(value: Currency): boolean {
        return true;
    }

    isRefImgValid(value: File[]): boolean {
        return true;
    }

    isTimesAllowedDraftToChangeValid(value: number): boolean {
        return true
    }

    isTimesAllowedCompletionToChangeValid(value: number): boolean {
        return true;
    }

}

import {OpenCommissionUseCase} from "../../../domain/open-commission/open-commission.usecase";
import {injectable} from "inversify";
import {Price} from "../../../domain/price/price";

@injectable()
export default class DefaultOpenCommissionUseCase implements OpenCommissionUseCase {
    isDayNeedValid(value: number): boolean {
        return true;
    }

    isDepositRuleValid(value: string): boolean {
        return true;
    }

    isDescValid(value: string): boolean {
        return true;
    }

    isMinPriceValid(value: Price): boolean {
        return true;
    }

    isOpenCommNameValid(value: string): boolean {
        return true;
    }

    isRefImgValid(value: File[]): boolean {
        return true;
    }

    isTimesAllowedCompletionToChangeValid(value: number): boolean {
        return true;
    }

}

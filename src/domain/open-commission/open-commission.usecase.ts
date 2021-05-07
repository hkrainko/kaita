import {Currency, Price} from "../price/price";

export interface OpenCommissionUseCase {
    isTitleValid(value: string): boolean;

    isMinPriceAmountValid(value: number): boolean

    isMinPriceCurrencyValid(value: Currency): boolean

    isDayNeedValid(value: number): boolean;

    isTimesAllowedDraftToChangeValid(value: number): boolean;

    isTimesAllowedCompletionToChangeValid(value: number): boolean;

    isDepositRuleValid(value: string): boolean;

    isDescValid(value: string): boolean;

    isRefImgValid(value: File[]): boolean;
}

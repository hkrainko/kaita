import {Price} from "../price/price";

export interface OpenCommissionUseCase {
    isOpenCommNameValid(value: string): boolean;
    isMinPriceValid(value: Price): boolean;
    isDayNeedValid(value: number): boolean;
    isTimesAllowedCompletionToChangeValid(value: number): boolean;
    isDepositRuleValid(value: string): boolean;
    isDescValid(value: string): boolean;
    isRefImgValid(value: File[]): boolean;
}

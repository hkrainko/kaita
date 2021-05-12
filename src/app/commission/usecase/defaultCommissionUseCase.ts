import {injectable} from "inversify";
import {CommissionUseCase} from "../../../domain/commission/commission.usecase";
import {Commission, CommissionState} from "../../../domain/commission/model/commission";


@injectable()
export default class DefaultCommissionUseCase implements CommissionUseCase {

    isAllowedToSendMessage(comm: Commission): boolean {
        switch (comm.state) {
            case CommissionState.PendingArtistApproval:
            case CommissionState.PendingRequesterModificationValidation:
            case CommissionState.InProgress:
            case CommissionState.PendingRequesterAcceptance:
            case CommissionState.PendingUploadProduct:
            case CommissionState.PendingUploadProductDueToRevisionExceed:
            case CommissionState.PendingRequesterAcceptProduct:
                return true;
            default:
                return false;
        }
    }

    isDayNeedValid(value: number): boolean {
        return true
    }

    isBudgetValid(value: number): boolean {
        return true;
    }

    isCurrencyValid(value: string): boolean {
        return true;
    }

    isDescValid(value: string): boolean {
        return true;
    }

    isExportFormatValid(value: string): boolean {
        return true;
    }

    isPaymentMethodValid(value: string): boolean {
        return true;
    }

    isResolutionValid(value: number): boolean {
        return true;
    }

    isSizeHeightValid(value: number): boolean {
        return true;
    }

    isSizeUnitValid(value: string): boolean {
        return true;
    }

    isSizeWidthValid(value: number): boolean {
        return true;
    }

}

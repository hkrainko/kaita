import {injectable} from "inversify";
import {CommissionUseCase} from "../../../domain/commission/commission.usecase";
import {Commission, CommissionState} from "../../../domain/commission/model/commission";
import {ImageMessage, MessageType, SystemMessage, TextMessage} from "../../../domain/message/model/message";
import {CommissionAction} from "../../../domain/commission/model/commission-action";
import {
    PendingValidationArtistCommissionAction,
    PendingValidationRequesterCommissionAction
} from "./model/commission-action/pending-validation-commission-action";
import {
    InvalidateDueToSystemArtistCommissionAction,
    InvalidateDueToSystemRequesterCommissionAction
} from "./model/commission-action/invalidate-due-to-system-commission-action";
import {
    InProgressArtistCommissionAction,
    InProgressRequesterCommissionAction
} from "./model/commission-action/in-progress-commission-action";
import {
    PendingRequesterAcceptProductArtistCommissionAction,
    PendingRequesterAcceptProductRequesterCommissionAction
} from "./model/commission-action/pending-requester-accept-product-commission-action";
import {
    DeclinedByArtistArtistCommissionAction,
    DeclinedByArtistRequesterCommissionAction
} from "./model/commission-action/declined-by-artist-commission-action";
import {
    CancelledByRequesterArtistCommissionAction,
    CancelledByRequesterRequesterCommissionAction
} from "./model/commission-action/cancelled-by-requester-commission-action";
import {
    PendingUploadProductArtistCommissionAction,
    PendingUploadProductRequesterCommissionAction
} from "./model/commission-action/pending-upload-product-commission-action";
import {
    PendingUploadProductDueToRevisionExceedArtistCommissionAction,
    PendingUploadProductDueToRevisionExceedRequesterCommissionAction
} from "./model/commission-action/pending-upload-product-due-to-revision-exceed-commission-action";
import {
    CompletedArtistCommissionAction,
    CompletedRequesterCommissionAction
} from "./model/commission-action/completed-commission-action";
import {PendingRequesterAcceptanceArtistCommissionAction} from "./model/commission-action/pending-requester-acceptance-commisson-action";


@injectable()
export default class DefaultCommissionUseCase implements CommissionUseCase {

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

    getLastMessageText(commission: Commission): string {
        if (!commission.lastMessage) {
            return "(沒有訊息)";
        }
        const lastMessage = commission.lastMessage;
        switch (lastMessage.messageType) {
            case MessageType.Text:
                return (lastMessage as TextMessage).text;
            case MessageType.Image:
                return '圖片 ' + (lastMessage as ImageMessage).text;
            case MessageType.System:
                return (lastMessage as SystemMessage).text;
            default:
                return "(沒有訊息)";
        }
    }

    getCommissionSteps(): CommissionState[] {

        // TODO: server record commission state history
        return [
            CommissionState.PendingValidation,
            CommissionState.PendingArtistApproval,
            CommissionState.InProgress,
            CommissionState.PendingRequesterAcceptance,
            CommissionState.PendingUploadProduct,
            CommissionState.Completed
        ]
    }

    getCommissionStepText(state: CommissionState): string | null {
        switch (state) {
            case CommissionState.PendingValidation:
                return '等待系統審查委托。'
            case CommissionState.PendingArtistApproval:
                return '等待繪師接受委托'
            case CommissionState.InProgress:
                return '等待繪師完成委托'
            case CommissionState.PendingRequesterAcceptance:
                return '等待委托人查看完稿'
            case CommissionState.PendingUploadProduct:
                return '等待繪師上傳完成品'
            case CommissionState.Completed:
                return '委托完成'
            default:
                return null
        }
    }

    getCommissionAction(comm: Commission, userId: string): CommissionAction | null {
        if (userId === comm.artistId) {
            switch (comm.state) {
                case CommissionState.PendingValidation:
                    return new PendingValidationArtistCommissionAction();
                case CommissionState.InvalidatedDueToOpenCommission:
                    return new InvalidateDueToSystemArtistCommissionAction();
                case CommissionState.InvalidatedDueToUsers:
                    return new InvalidateDueToSystemArtistCommissionAction();
                // case CommissionState.PendingArtistApproval:
                //     return new PendingArtistApprovalArtistCommissionAction(
                //         (): Observable<string> => {
                //             const updater: CommissionUpdater = {decision: CommissionDecision.ArtistDecline};
                //             return this.updateCommission(comm.id, updater);
                //         },
                //         (): Observable<string> => {
                //             const updater: CommissionUpdater = {decision: CommissionDecision.ArtistAccept};
                //             return this.updateCommission(comm.id, updater);
                //         }
                //     );
                case CommissionState.InProgress:
                    return new InProgressArtistCommissionAction();
                case CommissionState.PendingRequesterAcceptance:
                    return new PendingRequesterAcceptanceArtistCommissionAction();
                case CommissionState.DeclinedByArtist:
                    return new DeclinedByArtistArtistCommissionAction();
                case CommissionState.CancelledByRequester:
                    return new CancelledByRequesterArtistCommissionAction();
                case CommissionState.PendingUploadProduct:
                    return new PendingUploadProductArtistCommissionAction();
                case CommissionState.PendingUploadProductDueToRevisionExceed:
                    return new PendingUploadProductDueToRevisionExceedArtistCommissionAction();
                case CommissionState.PendingRequesterAcceptProduct:
                    return new PendingRequesterAcceptProductArtistCommissionAction();
                case CommissionState.Completed:
                    return new CompletedArtistCommissionAction();
                default:
                    return null;
            }
        } else if (userId === comm.requesterId) {
            switch (comm.state) {
                case CommissionState.PendingValidation:
                    return new PendingValidationRequesterCommissionAction();
                case CommissionState.InvalidatedDueToOpenCommission:
                    return new InvalidateDueToSystemRequesterCommissionAction();
                case CommissionState.InvalidatedDueToUsers:
                    return new InvalidateDueToSystemRequesterCommissionAction();
                case CommissionState.PendingArtistApproval:
                    // return new PendingArtistApprovalRequesterCommissionAction(
                    //     (): Observable<string> => {
                    //         const updater: CommissionUpdater = {decision: CommissionDecision.RequesterCancel};
                    //         return this.updateCommission(comm.id, updater);
                    //     }
                    // );
                case CommissionState.InProgress:
                    return new InProgressRequesterCommissionAction();
                // case CommissionState.PendingRequesterAcceptance:
                //     return new PendingRequesterAcceptanceRequesterCommissionAction(
                //         (): Observable<string> => {
                //             const updater: CommissionUpdater = {decision: CommissionDecision.RequesterRequestRevision};
                //             return this.updateCommission(comm.id, updater);
                //         },
                //         (): Observable<string> => {
                //             const updater: CommissionUpdater = {decision: CommissionDecision.RequesterAcceptProofCopy};
                //             return this.updateCommission(comm.id, updater);
                //         }
                //     );
                case CommissionState.DeclinedByArtist:
                    return new DeclinedByArtistRequesterCommissionAction();
                case CommissionState.CancelledByRequester:
                    return new CancelledByRequesterRequesterCommissionAction();
                case CommissionState.PendingUploadProduct:
                    return new PendingUploadProductRequesterCommissionAction();
                case CommissionState.PendingUploadProductDueToRevisionExceed:
                    return new PendingUploadProductDueToRevisionExceedRequesterCommissionAction();
                case CommissionState.PendingRequesterAcceptProduct:
                    return new PendingRequesterAcceptProductRequesterCommissionAction();
                case CommissionState.Completed:
                    return new CompletedRequesterCommissionAction();
                default:
                    return null;
            }
        }
        return null
    }

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

}

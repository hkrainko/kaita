import {injectable} from "inversify";
import {CommissionUseCase} from "../../../domain/commission/commission.usecase";
import {Commission, CommissionState} from "../../../domain/commission/model/commission";
import {ImageMessage, MessageType, SystemMessage, TextMessage} from "../../../domain/message/model/message";


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

    getCommissionActionDesc(state: CommissionState, type: 'artist' | 'requester'): string | null {
        switch (type) {
            case 'artist':
                switch (state) {
                    case CommissionState.PendingValidation:
                        return "請等待系統審查委托。";
                    case CommissionState.InvalidatedDueToOpenCommission:
                        return "系統審查失敗，委托失效。";
                    case CommissionState.InvalidatedDueToUsers:
                        return "系統審查失敗，委托失效。";
                    case CommissionState.PendingArtistApproval:
                        return "等待接受委托。";
                    case CommissionState.InProgress:
                        return "請在期限內完成委托。";
                    case CommissionState.PendingRequesterAcceptance:
                        return "等待委托人查看完稿。";
                    case CommissionState.DeclinedByArtist:
                        return "您已拒絕接收此委托。";
                    case CommissionState.CancelledByRequester:
                        return "委托人已取消此委托。";
                    case CommissionState.PendingUploadProduct:
                        return "請上傳收完成品。";
                    case CommissionState.PendingUploadProductDueToRevisionExceed:
                        return "已到達完稿修訂上限，請上傳收完成品。";
                    case CommissionState.PendingRequesterAcceptProduct:
                        return "正在等待委托人接收完成品。";
                    case CommissionState.Completed:
                        return "委托已完成。";
                    default:
                        return null;
                }
            case 'requester':
                switch (state) {
                    case CommissionState.PendingValidation:
                        return "請等待系統審查委托。";
                    case CommissionState.InvalidatedDueToOpenCommission:
                        return "系統審查失敗，委托失效。";
                    case CommissionState.InvalidatedDueToUsers:
                        return "系統審查失敗，委托失效。";
                    case CommissionState.PendingArtistApproval:
                        return "等待繪師接受委托。";
                    case CommissionState.InProgress:
                        return "等待繪師完成委托。";
                    case CommissionState.PendingRequesterAcceptance:
                        return "完稿已上傳，請查看。";
                    case CommissionState.DeclinedByArtist:
                        return "繪師已拒絕接受此委托。";
                    case CommissionState.CancelledByRequester:
                        return "您已取消此委托。";
                    case CommissionState.PendingUploadProduct:
                        return "等待繪師上傳完成品。";
                    case CommissionState.PendingUploadProductDueToRevisionExceed:
                        return "已到達完稿修訂上限，請等待繪師上傳完成品。";
                    case CommissionState.PendingRequesterAcceptProduct:
                        return "請接收完成品。";
                    case CommissionState.Completed:
                        return "委托已完成。";
                    default:
                        return null;
                }
        }
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

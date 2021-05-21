import {Price} from "../../../../../domain/price/price";
import {Size} from "../../../../../domain/artwork/size";
import {Commission, CommissionState} from "../../../../../domain/commission/model/commission";
import {Message} from "../../../../../domain/message/model/message";
import {Mapper} from "../../../../../domain/mapper";

export interface HttpCommissionModel {
    id: string;
    openCommissionId: string;
    openCommissionTitle: string;
    artistId: string;
    artistName: string;
    artistProfilePath?: string;
    requesterId: string;
    requesterName: string;
    requesterProfilePath?: string;
    price: Price;
    dayNeed: number;
    size?: Size;
    resolution?: number;
    exportFormat?: string;
    desc: string;
    paymentMethod: string;
    isR18: boolean;
    bePrivate: boolean;
    anonymous: boolean;
    refImagePaths: string[];

    timesAllowedDraftToChange: number;
    timesAllowedCompletionToChange: number;
    draftChangingRequestTime: number;
    proofCopyRevisionRequestTime: number;

    messages: Message[];

    proofCopyImagePaths?: string[];
    displayImagePath?: string;
    completionFilePath?: string;
    rating?: number;
    comment?: string;

    createTime: string;
    completedTime?: string;
    lastUpdateTime: string;
    state: CommissionState;
}

export class HttpCommissionModelMapper extends Mapper<HttpCommissionModel, Commission> {

    mapFrom(param: HttpCommissionModel): Commission {
        return {
            completedTime: param.completedTime,
            timesAllowedCompletionToChange: param.timesAllowedCompletionToChange,
            anonymous: param.anonymous,
            artistId: param.artistId,
            artistName: param.artistName,
            artistProfilePath: param.artistProfilePath,
            bePrivate: param.bePrivate,
            comment: param.comment,
            completionFilePath: param.completionFilePath,
            createTime: param.createTime,
            dayNeed: param.dayNeed,
            desc: param.desc,
            displayImagePath: param.displayImagePath,
            draftChangingRequestTime: param.draftChangingRequestTime,
            exportFormat: param.exportFormat,
            id: param.id,
            isR18: param.isR18,
            lastMessage: param.messages?.length > 0 ? param.messages[param.messages.length - 1] : undefined,
            lastUpdateTime: param.lastUpdateTime,
            openCommissionId: param.openCommissionId,
            openCommissionTitle: param.openCommissionTitle,
            paymentMethod: param.paymentMethod,
            price: param.price,
            proofCopyImagePaths: param.proofCopyImagePaths,
            proofCopyRevisionRequestTime: param.proofCopyRevisionRequestTime,
            rating: param.rating,
            refImagePaths: param.refImagePaths,
            requesterId: param.requesterId,
            requesterName: param.requesterName,
            requesterProfilePath: param.requesterProfilePath,
            resolution: param.resolution,
            size: param.size,
            state: param.state,
            timesAllowedDraftToChange: param.timesAllowedCompletionToChange
        };
    }

    mapTo(param: Commission): HttpCommissionModel {
        return {
            completedTime: param.completedTime,
            timesAllowedCompletionToChange: param.timesAllowedCompletionToChange,
            anonymous: param.anonymous,
            artistId: param.artistId,
            artistName: param.artistName,
            artistProfilePath: param.artistProfilePath,
            bePrivate: param.bePrivate,
            comment: param.comment,
            completionFilePath: param.completionFilePath,
            createTime: param.createTime,
            dayNeed: param.dayNeed,
            desc: param.desc,
            displayImagePath: param.displayImagePath,
            draftChangingRequestTime: param.draftChangingRequestTime,
            exportFormat: param.exportFormat,
            id: param.id,
            isR18: param.isR18,
            messages: param.lastMessage ? [param.lastMessage] : [],
            lastUpdateTime: param.lastUpdateTime,
            openCommissionId: param.openCommissionId,
            openCommissionTitle: param.openCommissionTitle,
            paymentMethod: param.paymentMethod,
            price: param.price,
            proofCopyImagePaths: param.proofCopyImagePaths,
            proofCopyRevisionRequestTime: param.proofCopyRevisionRequestTime,
            rating: param.rating,
            refImagePaths: param.refImagePaths,
            requesterId: param.requesterId,
            requesterName: param.requesterName,
            requesterProfilePath: param.requesterProfilePath,
            resolution: param.resolution,
            size: param.size,
            state: param.state,
            timesAllowedDraftToChange: param.timesAllowedCompletionToChange

        };
    }

}

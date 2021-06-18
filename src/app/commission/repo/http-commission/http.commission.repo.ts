import {CommissionRepo} from '../../../../domain/commission/commission.repo';
import {Commission} from '../../../../domain/commission/model/commission';
import {CommissionCreator} from '../../../../domain/commission/model/commission-creator';
import {HttpAddCommissionModel, HttpAddCommissionModelMapper} from './model/http.add-commission.model';
import {CommissionFilter} from '../../../../domain/commission/model/commission-filter';
import {CommissionSorter} from '../../../../domain/commission/model/commission-sorter';
import {HttpGetCommissionsModel, HttpGetCommissionsModelMapper} from './model/http.get-commissions.model';
import {CommissionsBatch} from '../../../../domain/commission/model/commissions-batch';
import {MessageCreator} from '../../../../domain/message/model/message-creator';
import {HttpGetMessagesModel, HttpGetMessagesModelMapper} from './model/http.get-messages.model';
import {MessagesBatch} from '../../../../domain/commission/model/messages-batch';
import {HttpGetCommissionModel, HttpGetCommissionModelMapper} from './model/http.get-commission.model';
import {HttpCreateMessageModel, HttpCreateMessageModelMapper} from './model/http.create-message.model';
import {CommissionUpdater} from '../../../../domain/commission/model/commission-updater';
import {HttpUpdateCommissionModel, HttpUpdateCommissionModelMapper} from './model/http.update-commission.model';
import {injectable} from "inversify";
import {ImageMessage, Message, MessageType, SystemMessage, TextMessage} from "../../../../domain/message/model/message";
import axios from "axios";
import {Currency} from "../../../../domain/price/price";
import {AppError, UnknownError} from "../../../../domain/error/model/error";
import config from "../../../config";


@injectable()
export class HttpCommissionRepo implements CommissionRepo {

    private apiPath = config.API_PATH;
    private wsPath = 'ws://192.168.64.12:31398/ws';
    private ws?: WebSocket;
    private isWsConnected = false;

    addCommissionModelMapper = new HttpAddCommissionModelMapper();
    getCommissionsModelMapper = new HttpGetCommissionsModelMapper();
    getCommissionModelMapper = new HttpGetCommissionModelMapper();
    getMessagesModelMapper = new HttpGetMessagesModelMapper();
    createMessagesModelMapper = new HttpCreateMessageModelMapper();
    updateCommissionModelMapper = new HttpUpdateCommissionModelMapper();

    submitCommission(apiToken: string, requesterId: string, commCreator: CommissionCreator): Promise<string> {
        const formData: any = new FormData();
        formData.append('openCommissionId', commCreator.openCommissionId);
        formData.append('artistId', commCreator.artistId);
        formData.append('requesterId', requesterId);
        formData.append('price.amount', commCreator.price.amount);
        formData.append('price.currency', commCreator.price.currency);
        formData.append('dayNeed', commCreator.dayNeed);
        if (commCreator.size) {
            formData.append('size.width', commCreator.size.width);
            formData.append('size.height', commCreator.size.height);
            formData.append('size.unit', commCreator.size.unit);
        }
        if (commCreator.resolution) {
            formData.append('resolution', commCreator.resolution);
        }
        if (commCreator.exportFormat) {
            formData.append('exportFormat', commCreator.exportFormat);
        }
        formData.append('desc', commCreator.desc);
        formData.append('paymentMethod', commCreator.paymentMethod);
        formData.append('isR18', commCreator.isR18);
        formData.append('bePrivate', commCreator.bePrivate);
        formData.append('anonymous', commCreator.anonymous);
        commCreator.refImages.forEach(file => {
            formData.append('refImages', file);
        });

        const headers = {
            Authorization: 'Bearer ' + apiToken,
        }

        return axios
            .post<HttpAddCommissionModel>(`${this.apiPath}/commissions`, formData, {
                headers
            })
            .then(resp => {
                return this.addCommissionModelMapper.mapFrom(resp.data)
            })
    }

    getCommission(apiToken: string, commissionId: string): Promise<Commission> {

        const url = `${this.apiPath}/commissions/${commissionId}`;
        const headers = {
            Authorization: 'Bearer ' + apiToken,
        }

        return axios
            .get<HttpGetCommissionModel>(url, {headers})
            .then(resp => {
                return this.getCommissionModelMapper.mapFrom(resp.data)
            })
    }

    getCommissions(apiToken: string, filter: CommissionFilter, sorter: CommissionSorter): Promise<CommissionsBatch> {

        const url = `${this.apiPath}/commissions/`;
        const params = this.getCommFilterHttpParams(filter);

        const headers = {
            Authorization: 'Bearer ' + apiToken,
        }

        return axios
            .get<HttpGetCommissionsModel>(url, {headers, params})
            .then(resp => {
                return this.getCommissionsModelMapper.mapFrom(resp.data)
            })
    }

    getRequestList(apiToken: string, count: number, offset: number): Promise<Commission[]> {
        throw Error
    }

    updateCommission(apiToken: string, commId: string, updater: CommissionUpdater): Promise<string> {
        const url = `${this.apiPath}/commissions/${commId}`;
        const formData: any = new FormData();
        formData.append('decision', updater.decision);

        if (updater.price) {
            formData.append('price.amount', updater.price.amount);
            formData.append('price.currency', updater.price.currency);
        }
        if (updater.dayNeed) {
            formData.append('dayNeed', updater.dayNeed);
        }
        if (updater.size) {
            formData.append('size.width', updater.size.width);
            formData.append('size.height', updater.size.height);
            formData.append('size.unit', updater.size.unit);
        }
        if (updater.resolution) {
            formData.append('resolution', updater.resolution);
        }
        if (updater.exportFormat) {
            formData.append('exportFormat', updater.exportFormat);
        }
        if (updater.paymentMethod) {
            formData.append('paymentMethod', updater.paymentMethod);
        }
        if (updater.bePrivate) {
            formData.append('resolution', updater.bePrivate);
        }
        if (updater.anonymous) {
            formData.append('anonymous', updater.anonymous);
        }
        if (updater.rating) {
            formData.append('rating', updater.rating);
        }
        if (updater.comment) {
            formData.append('comment', updater.comment);
        }
        if (updater.rating) {
            formData.append('rating', updater.rating);
        }
        if (updater.displayImage) {
            formData.append('displayImage', updater.displayImage);
        }
        if (updater.proofCopyImage) {
            formData.append('proofCopyImage', updater.proofCopyImage);
        }
        if (updater.completionFile) {
            formData.append('completionFile', updater.completionFile);
        }

        const headers = {
            Authorization: 'Bearer ' + apiToken,
        }

        return axios
            .patch<HttpUpdateCommissionModel>(url, formData, {headers})
            .then(resp => {
                return this.updateCommissionModelMapper.mapFrom(resp.data)
            })
    }

    getMessages(apiToken: string, commId: string, count: number, lastMessageId?: string): Promise<MessagesBatch> {
        const url = `${this.apiPath}/commissions/${commId}/messages`;
        let params = {
            lastMessageId,
            count
        }
        const headers = {
            Authorization: 'Bearer ' + apiToken,
        }
        return axios
            .get<HttpGetMessagesModel>(url, {headers, params})
            .then(resp => {
                return this.getMessagesModelMapper.mapFrom(resp.data)
            })
    }

    // sendMessage(apiToken: string, msgCreator: MessageCreator): void {
    //   const wsMsg: WsMessageReq = {
    //     type: 'chat',
    //     body: msgCreator,
    //   };
    //   this.ws.next(`${JSON.stringify(wsMsg)}`);
    // }

    sendMessage(apiToken: string, msgCreator: MessageCreator): Promise<Message> {
        const formData: any = new FormData();
        if (msgCreator.text) {
            formData.append('text', msgCreator.text);
        }
        if (msgCreator.image) {
            formData.append('image', msgCreator.image);
        }
        const headers = {
            Authorization: 'Bearer ' + apiToken,
        }

        return axios
            .post<HttpCreateMessageModel>(`${this.apiPath}/commissions/${msgCreator.commissionId}/messages`, formData, {
                headers
            })
            .then(resp => {
                return this.createMessagesModelMapper.mapFrom(resp.data)
            })
    }

    startStm(
        apiToken: string,
        onConnected: () => void,
        onDisconnected: (err: AppError) => void,
        onReconnecting: () => void,
        onReceived: (message: Message) => void,
    ): void {

        console.log(`startStm`);
        if (this.isWsConnected) {
            onDisconnected(new UnknownError())
            return
        }

        this.ws = new WebSocket(`${this.wsPath}?access_token=${apiToken}`)

        this.ws.onerror = (event) => {
            console.log(`ws onerror err:${JSON.stringify(event)}`);
            this.isWsConnected = false;
            onDisconnected(new UnknownError())
        }

        this.ws.onmessage = (msgEvent) => {
            const message = JSON.parse(msgEvent.data)
            console.log(`in msg:${JSON.stringify(message)}`);
            const msg: Message = (message as Message);
            console.log(`messageType:${msg.messageType}`);
            switch (msg.messageType) {
                case MessageType.Text:
                    const textMsg: TextMessage = (message as TextMessage);
                    onReceived(textMsg)
                    break;
                case  MessageType.Image:
                    const imgMsg: ImageMessage = (message as ImageMessage);
                    onReceived(imgMsg)
                    break;
                case MessageType.System:
                    const sysMsg: SystemMessage = (message as SystemMessage);
                    onReceived(sysMsg)
                    break;
                default:
                    break;
            }
        }

        this.ws.onclose = () => {
            console.log('ws disconnected');
            this.isWsConnected = false;
            onDisconnected(new UnknownError())
        }

        this.ws.onopen = () => {
            console.log('ws onopen');
            this.isWsConnected = true;
            onConnected()
        }

        // this.ws.subscribe(
        //     message => {
        //         console.log(`in msg:${JSON.stringify(message)}`);
        //         const msg: Message = (message as Message);
        //         console.log(`messageType:${msg.messageType}`);
        //         switch (msg.messageType) {
        //             case MessageType.Text:
        //                 const textMsg: TextMessage = (message as TextMessage);
        //                 this.stmMessage$.next(textMsg);
        //                 break;
        //             case  MessageType.Image:
        //                 const imgMsg: ImageMessage = (message as ImageMessage);
        //                 this.stmMessage$.next(imgMsg);
        //                 break;
        //             case MessageType.System:
        //                 const sysMsg: SystemMessage = (message as SystemMessage);
        //                 this.stmMessage$.next(sysMsg);
        //                 break;
        //             default:
        //                 break;
        //         }
        //     },
        //     err => {
        //         console.log(`ws err:${err}`);
        //     },
        //     () => {
        //         console.log('complete');
        //     }
        // );
    }

    stopStm(): void {
        this.ws?.close()
    }

    // Private
    private getCommFilterHttpParams = (filter: CommissionFilter): CommFilterHttpParams => {
        let params: CommFilterHttpParams = {}
        if (filter.artistId) {
            params.artistId = filter.artistId
        }
        if (filter.requesterId) {
            params.requesterId = filter.requesterId
        }
        params.count = filter.count
        params.offset = filter.offset

        if (filter.priceFrom) {
            params["priceFrom.amount"] = filter.priceFrom.amount
            params["priceFrom.currency"] = filter.priceFrom.currency
        }
        if (filter.priceTo) {
            params["priceTo.amount"] = filter.priceTo.amount
            params["priceTo.currency"] = filter.priceTo.currency
        }
        if (filter.dayNeedFrom) {
            params.dayNeedFrom = filter.dayNeedFrom
        }
        if (filter.dayNeedTo) {
            params.dayNeedTo = filter.dayNeedTo
        }
        if (filter.createTimeFrom) {
            params.createTimeFrom = filter.createTimeFrom
        }
        if (filter.createTimeTo) {
            params.createTimeTo = filter.createTimeTo
        }
        return params;
    }
}

interface CommFilterHttpParams {
    artistId?: string,
    requesterId?: string
    count?: number
    offset?: number
    'priceFrom.amount'?: number
    'priceFrom.currency'?: Currency
    'priceTo.amount'?: number
    'priceTo.currency'?: Currency
    dayNeedFrom?: number
    dayNeedTo?: number
    createTimeFrom?: Date
    createTimeTo?: Date
}

import {CommissionRepo} from '../../../../domain/commission/commission.repo';
import {Observable, Subject, throwError} from 'rxjs';
import {Commission} from '../../../../domain/commission/model/commission';
import {CommissionCreator} from '../../../../domain/commission/model/commission-creator';
import {HttpAddCommissionModel, HttpAddCommissionModelMapper} from './model/http.add-commission.model';
import {catchError, map} from 'rxjs/operators';
import {
    OpenCommissionErrorUnAuth,
    OpenCommissionErrorUnknown
} from '../../../../domain/open-commission/model/open-commission-error';
import {CommissionFilter} from '../../../../domain/commission/model/commission-filter';
import {CommissionSorter} from '../../../../domain/commission/model/commission-sorter';
import {HttpGetCommissionsModel, HttpGetCommissionsModelMapper} from './model/http.get-commissions.model';
import {CommissionsBatch} from '../../../../domain/commission/model/commissions-batch';
import {MessageCreator} from '../../../../domain/message/model/message-creator';
import {HttpGetMessagesModel, HttpGetMessagesModelMapper} from './model/http.get-messages.model';
import {NotFoundError, UnAuthError, UnknownError} from '../../../../domain/error/model/error';
import {MessagesBatch} from '../../../../domain/commission/model/messages-batch';
import {WebSocketSubject} from 'rxjs/webSocket';
import {HttpGetCommissionModel, HttpGetCommissionModelMapper} from './model/http.get-commission.model';
import {HttpCreateMessageModel, HttpCreateMessageModelMapper} from './model/http.create-message.model';
import {CommissionUpdater} from '../../../../domain/commission/model/commission-updater';
import {HttpUpdateCommissionModel, HttpUpdateCommissionModelMapper} from './model/http.update-commission.model';
import {injectable} from "inversify";
import {ImageMessage, Message, MessageType, SystemMessage, TextMessage} from "../../../../domain/message/model/message";
import axios from "axios";
import {Currency} from "../../../../domain/price/price";


@injectable()
export class HttpCommissionRepo implements CommissionRepo {

    private apiPath = 'http://192.168.64.12:31398/api';
    private wsPath = 'http://192.168.64.12:31398/ws';
    private ws?: WebSocketSubject<any>;
    private isWsConnected = false;

    stmCommission$ = new Subject<Commission>();
    stmMessage$ = new Subject<Message>();

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

    getMessages(apiToken: string, commId: string, offset: number, count: number): Promise<MessagesBatch> {
        const url = `${this.apiPath}/commissions/${commId}/messages`;
        let params = {
            offset,
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

    startStm(apiToken: string): void {
        console.log(`startStm`);
        if (this.isWsConnected) {
            return;
        }

        this.ws = new WebSocketSubject({
            url: this.wsPath + `?access_token=${apiToken}`,
            openObserver: {
                next: value => {
                    console.log('ws connection ok');
                    this.isWsConnected = true;
                }
            },
            closeObserver: {
                next: value => {
                    console.log('ws disconnected');
                    this.isWsConnected = false;
                }
            },
        });

        this.ws.subscribe(
            message => {
                console.log(`in msg:${JSON.stringify(message)}`);
                const msg: Message = (message as Message);
                console.log(`messageType:${msg.messageType}`);
                switch (msg.messageType) {
                    case MessageType.Text:
                        const textMsg: TextMessage = (message as TextMessage);
                        this.stmMessage$.next(textMsg);
                        break;
                    case  MessageType.Image:
                        const imgMsg: ImageMessage = (message as ImageMessage);
                        this.stmMessage$.next(imgMsg);
                        break;
                    case MessageType.System:
                        const sysMsg: SystemMessage = (message as SystemMessage);
                        this.stmMessage$.next(sysMsg);
                        break;
                    default:
                        break;
                }

                // this.stmMessage$.next(null);
                // this.stmCommission$.next(null);
            },
            err => {
                console.log(`ws err:${err}`);
            },
            () => {
                console.log('complete');
            }
        );
    }

    stopStm(): void {
        this.ws?.unsubscribe();
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

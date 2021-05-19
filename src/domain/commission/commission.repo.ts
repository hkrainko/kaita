import {Commission} from './model/commission';
import {CommissionCreator} from './model/commission-creator';
import {CommissionFilter} from './model/commission-filter';
import {CommissionSorter} from './model/commission-sorter';
import {CommissionsBatch} from './model/commissions-batch';
import {MessageCreator} from '../message/model/message-creator';
import {MessagesBatch} from './model/messages-batch';
import {Message} from '../message/model/message';
import {CommissionUpdater} from './model/commission-updater';
import {AppError} from "../error/model/error";


export interface CommissionRepo {

    submitCommission(apiToken: string, requesterId: string, commCreator: CommissionCreator): Promise<string>;

    getCommission(apiToken: string, commissionId: string): Promise<Commission>;

    getCommissions(apiToken: string, filter: CommissionFilter, sorter: CommissionSorter): Promise<CommissionsBatch>;

    getRequestList(artistId: string, count: number, offset: number): Promise<Commission[]>;

    updateCommission(apiToken: string, commId: string, updater: CommissionUpdater): Promise<string>;

    getMessages(apiToken: string, commId: string, offset: number, count: number): Promise<MessagesBatch>;

    sendMessage(apiToken: string, msgCreator: MessageCreator): Promise<Message>;

    startStm(
        apiToken: string,
        onConnected: () => void,
        onDisconnected: (err: AppError) => void,
        onReconnecting: () => void,
        onReceived: (message: string) => void,
    ): void;

    stopStm(): void;
}

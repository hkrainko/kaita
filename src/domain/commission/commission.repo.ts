import {Commission} from './model/commission';
import {Observable, Subject} from 'rxjs';
import {CommissionCreator} from './model/commission-creator';
import {CommissionFilter} from './model/commission-filter';
import {CommissionSorter} from './model/commission-sorter';
import {CommissionsBatch} from './model/commissions-batch';
import {MessageCreator} from '../message/model/message-creator';
import {MessagesBatch} from './model/messages-batch';
import {Message} from '../message/model/message';
import {CommissionUpdater} from './model/commission-updater';


export abstract class CommissionRepo {
  abstract stmCommission$: Subject<Commission>;
  abstract stmMessage$: Subject<Message>;
  abstract submitCommission(token: string, commCreator: CommissionCreator): Observable<string>;
  abstract getCommission(apiToken: string, commissionId: string): Observable<Commission>;
  abstract getCommissions(apiToken: string, filter: CommissionFilter, sorter: CommissionSorter): Observable<CommissionsBatch>;
  abstract getRequestList(artistId: string, count: number, offset: number): Observable<Commission[]>;
  abstract updateCommission(apiToken: string, commId: string, updater: CommissionUpdater): Observable<string>;
  abstract getMessages(apiToken: string, commId: string, offset: number, count: number): Observable<MessagesBatch>;
  abstract sendMessage(apiToken: string, msgCreator: MessageCreator): Observable<Message>;
  abstract startStm(apiToken: string): void;
  abstract stopStm(): void;
}

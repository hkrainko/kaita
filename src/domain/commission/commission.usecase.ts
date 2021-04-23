import {Observable, Subject} from 'rxjs';
import {OpenCommission} from '../open-commission/model/open-commission';
import {Commission} from './model/commission';
import {CommissionCreator} from './model/commission-creator';
import {CommissionFilter} from './model/commission-filter';
import {CommissionSorter} from './model/commission-sorter';
import {CommissionsBatch} from './model/commissions-batch';
import {CommissionUser} from './model/commission-user';
import {MessageCreator} from '../message/model/message-creator';
import {MessagesBatch} from './model/messages-batch';
import {Message} from '../message/model/message';
import {CommissionUpdater} from './model/commission-updater';
import {CommissionAction} from "./model/commission-action";


export abstract class CommissionUseCase {
  abstract openCommission: OpenCommission;
  abstract commissionCreator: CommissionCreator;
  abstract stmCommission$: Subject<Commission>;
  abstract stmMessage$: Subject<Message>;

  abstract submitCommission(commCreator: CommissionCreator): Observable<string>;
  abstract getCommissions(filter: CommissionFilter, sorter: CommissionSorter, isRequest: boolean): Observable<CommissionsBatch>;
  abstract getCommission(commId: string): Observable<Commission>;
  abstract updateCommission(commId: string, updater: CommissionUpdater): Observable<string>;

  abstract getCommissionUser(comm: Commission): CommissionUser | null;
  abstract getCommissionAction(comm: Commission): CommissionAction | null;
  abstract isAllowedToSendMessage(comm: Commission): boolean;

  abstract getMessages(commId: string, currentMsgCount: number): Observable<MessagesBatch>;
  abstract sendMessage(msgCreator: MessageCreator): Observable<Message>;

  abstract startStm(): Error | null;
  abstract stopStm(): void;

}

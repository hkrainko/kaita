import {Commission} from './model/commission';


export interface CommissionUseCase {
    // abstract openCommission: OpenCommission;
    // abstract commissionCreator: CommissionCreator;
    // abstract stmCommission$: Subject<Commission>;
    // abstract stmMessage$: Subject<Message>;
    //
    // abstract submitCommission(commCreator: CommissionCreator): Observable<string>;
    // abstract getCommissions(filter: CommissionFilter, sorter: CommissionSorter, isRequest: boolean): Observable<CommissionsBatch>;
    // abstract getCommission(commId: string): Observable<Commission>;
    // abstract updateCommission(commId: string, updater: CommissionUpdater): Observable<string>;
    //
    // abstract getCommissionUser(comm: Commission): CommissionUser | null;
    // abstract getCommissionAction(comm: Commission): CommissionAction | null;
    isAllowedToSendMessage(comm: Commission): boolean

    // abstract getMessages(commId: string, currentMsgCount: number): Observable<MessagesBatch>;
    // abstract sendMessage(msgCreator: MessageCreator): Observable<Message>;
    //
    // abstract startStm(): Error | null;
    // abstract stopStm(): void;

    isDayNeedValid(value: number): boolean

    isBudgetValid(value: number): boolean

    isCurrencyValid(value: string): boolean

    isPaymentMethodValid(value: string): boolean

    isSizeWidthValid(value: number): boolean

    isSizeHeightValid(value: number): boolean

    isSizeUnitValid(value: string): boolean

    isExportFormatValid(value: string): boolean

    isResolutionValid(value: number): boolean

    isDescValid(value: string): boolean

    getLastMessage(commission: Commission): string

}

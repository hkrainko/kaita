import {Commission, CommissionState} from './model/commission';
import {CommissionAction} from "./model/commission-action";


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

    getLastMessageText(commission: Commission): string

    getCommissionSteps(): CommissionState[]

    getCommissionStepText(state: CommissionState): string | null

    getCommissionActionDesc(state: CommissionState, type: 'artist' | 'requester'): string | null

    getCommissionAction(comm: Commission, userId: string): CommissionAction | null

    isAllowedToSendMessage(comm: Commission): boolean

}

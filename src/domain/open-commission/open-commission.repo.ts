import {OpenCommissionCreator} from './model/open-commission-creator';
import {OpenCommission} from './model/open-commission';
import {OpenCommissionFilter} from './model/open-commission-filter';
import {OpenCommissionUpdater} from './model/open-commission-updater';
import GetOpenCommissionsResult from "./model/get-open-commissions-result";

export interface OpenCommissionRepo {
    getOpenCommission(token: string | null, openCommId: string): Promise<OpenCommission>;

    getOpenCommissions(filter: OpenCommissionFilter): Promise<GetOpenCommissionsResult>;

    getOpenCommissionsForArtist(artistId: string): Promise<GetOpenCommissionsResult>;

    getOpenCommissionsDetailsForArtist(token: string, artistId: string): Promise<GetOpenCommissionsResult>;

    addOpenCommission(token: string, artistId: string, openCommCreator: OpenCommissionCreator): Promise<string>;

    updateOpenCommission(token: string, openCommUpdater: OpenCommissionUpdater): Promise<string>;

    deleteOpenCommission(token: string, OpenCommId: string): Promise<string>;

}

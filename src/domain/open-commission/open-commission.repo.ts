import {OpenCommissionCreator} from './model/open-commission-creator';
import {OpenCommission} from './model/open-commission';
import {OpenCommissionFilter} from './model/open-commission-filter';
import {OpenCommissionUpdater} from './model/open-commission-updater';

export interface OpenCommissionRepo {
    getOpenCommission(token: string | null, openCommId: string): Promise<OpenCommission>;

    getOpenCommissions(filter: OpenCommissionFilter): Promise<OpenCommission[]>;

    getOpenCommissionsForArtist(artistId: string): Promise<OpenCommission[]>;

    getOpenCommissionsDetailsForArtist(token: string, artistId: string): Promise<OpenCommission[]>;

    addOpenCommission(token: string, artistId: string, openCommCreator: OpenCommissionCreator): Promise<string>;

    updateOpenCommission(token: string, openCommUpdater: OpenCommissionUpdater): Promise<string>;

    deleteOpenCommission(token: string, OpenCommId: string): Promise<string>;

}

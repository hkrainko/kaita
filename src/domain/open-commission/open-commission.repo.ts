import {Observable} from 'rxjs';
import {OpenCommissionCreator} from './model/open-commission-creator';
import {OpenCommission} from './model/open-commission';
import {OpenCommissionFilter} from './model/open-commission-filter';
import {OpenCommissionUpdater} from './model/open-commission-updater';

export abstract class OpenCommissionRepo {
  abstract getOpenCommission(token: string | null, openCommId: string): Observable<OpenCommission>;

  abstract getOpenCommissions(filter: OpenCommissionFilter): Observable<OpenCommission[]>;

  abstract getOpenCommissionsForArtist(artistId: string): Observable<OpenCommission[]>;

  abstract getOpenCommissionsDetailsForArtist(token: string, artistId: string): Observable<OpenCommission[]>;

  abstract addOpenCommission(token: string, artistId: string, openCommCreator: OpenCommissionCreator): Observable<string>;

  abstract updateOpenCommission(token: string, openCommUpdater: OpenCommissionUpdater): Observable<string>;

  abstract deleteOpenCommission(token: string, OpenCommId: string): Observable<string>;

}

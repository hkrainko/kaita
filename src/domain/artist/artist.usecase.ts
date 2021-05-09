import {BehaviorSubject, Observable} from 'rxjs';
import {Artist} from './model/artist';
import {OpenCommissionUpdater} from '../open-commission/model/open-commission-updater';
import {OpenCommissionCreator} from '../open-commission/model/open-commission-creator';


export abstract class ArtistUseCase {
  abstract artist$: BehaviorSubject<Artist | null>;

  abstract getArtist(id: string): Observable<Artist>;

  abstract updateArtistBanner(artistId: string, bannerImage: File): Observable<string>;

  abstract updateArtistIntro(artistId: string, desc: string): Observable<string>;

  abstract addOpenCommissions(creator: OpenCommissionCreator): Observable<string>;

  abstract editOpenCommission(updater: OpenCommissionUpdater): Observable<string>;

  abstract deleteOpenCommission(openCommId: string): Observable<string>;
}

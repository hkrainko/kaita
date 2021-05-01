import {ArtistIntro} from '../../../../domain/artist/model/artist';

export interface RegisterRepoModel {
  authId: string;
  userId: string;
  displayName: string;
  email: string;
  birthday: string;
  gender: string;
  regAsArtist: boolean;
  profile: File;
  artistIntro?: ArtistIntro;
  regToken: string;
}

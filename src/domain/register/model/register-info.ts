import {ArtistIntro} from '../../artist/model/artist';

export interface RegisterInfo {
  authId: string;
  userId: string;
  displayName: string;
  email: string;
  birthday: string;
  gender: string;
  regAsArtist: boolean;
  profile?: File;
  artistIntro?: ArtistIntro;
}

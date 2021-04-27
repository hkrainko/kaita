import {Gender} from './gender';

export interface User {
  userId: string;
  userName: string;
  email?: string;
  birthday?: string;
  gender?: Gender;
  profilePath?: string;
  isArtist: boolean;
  regTime?: string;
  lastUpdateTime?: string;
  state: UserState;
}

export enum UserState {
  Pending = 'P',
  Active = 'A',
  Terminated = 'T',
}

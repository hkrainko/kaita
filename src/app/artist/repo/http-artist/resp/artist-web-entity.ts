export interface ArtistWebEntity {
  id: string;
  accountName: string;
  nickName: string;
  followerIds: Set<string>;
  favourIds: Set<string>;
  createDate: Date;
  lastUpdateDate: Date;
}

import {Price} from '../../price/price';
import {Size} from '../../artwork/size';
import {Message} from '../../message/model/message';

export interface Commission {
  id: string;
  openCommissionId: string;
  openCommissionTitle: string;
  artistId: string;
  artistName: string;
  artistProfilePath?: string;
  requesterId: string;
  requesterName: string;
  requesterProfilePath?: string;
  price: Price;
  dayNeed: number;
  size?: Size;
  resolution?: number;
  exportFormat?: string;
  desc: string;
  paymentMethod: string;
  isR18: boolean;
  bePrivate: boolean;
  anonymous: boolean;
  refImagePaths: string[];

  timesAllowedDraftToChange: number;
  TimesAllowedCompletionToChange: number;
  draftChangingRequestTime: number;
  proofCopyRevisionRequestTime: number;

  messages: Message[];

  proofCopyImagePaths?: string[];
  displayImagePath?: string;
  completionFilePath?: string;
  rating?: number;
  comment?: string;

  createTime: string;
  CompletedTime?: string;
  lastUpdateDate: string;
  state: CommissionState;
}

export enum CommissionState {
  Unknown = 'UNKNOWN',
  PendingValidation = 'PENDING_VALIDATION',
  InvalidatedDueToOpenCommission = 'INVALIDATED_DUE_TO_OPEN_COMMISSION',
  InvalidatedDueToUsers = 'INVALIDATED_DUE_TO_USERS',
  PendingArtistApproval = 'PENDING_ARTIST_APPROVAL',
  PendingRequesterModificationValidation = 'PENDING_REQUESTER_MODIFICATION_VALIDATION',
  InProgress = 'IN_PROGRESS',
  PendingRequesterAcceptance = 'PENDING_REQUESTER_ACCEPTANCE',
  DeclinedByArtist = 'DECLINED_BY_ARTIST',
  CancelledByRequester = 'CANCELED_BY_REQUESTER',
  PendingUploadProduct = 'PENDING_UPLOAD_PRODUCT',
  PendingUploadProductDueToRevisionExceed = 'PENDING_UPLOAD_PRODUCT_DUE_TO_REVISION_EXCEED',
  PendingRequesterAcceptProduct = 'PENDING_REQUESTER_ACCEPT_PRODUCT',
  Completed = 'COMPLETED',
}

export enum CommissionDecision {
  RequesterModify = 'REQUESTER_MODIFY',
  ArtistAccept = 'ARTIST_ACCEPT',
  ArtistDecline = 'ARTIST_DECLINE',
  RequesterCancel = 'REQUESTER_CANCEL',
  ArtistUploadProofCopy = 'ARTIST_UPLOAD_PROOF_COPY',
  RequesterAcceptProofCopy = 'REQUESTER_ACCEPT_PROOF_COPY',
  RequesterRequestRevision = 'REQUESTER_REQUEST_REVISION',
  ArtistUploadProduct = 'ARTIST_UPLOAD_PRODUCT',
  RequesterAcceptProduct = 'REQUESTER_ACCEPT_PRODUCT',
}

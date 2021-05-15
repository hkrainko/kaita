import {MessageCreator} from '../../../../../../domain/message/model/message-creator';

export interface WsMessageReq {
  type: string;
  body: any;
}

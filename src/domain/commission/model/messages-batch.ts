import {Message} from '../../message/model/message';


export interface MessagesBatch {
  commissionId: string;
  messages: Message[];
}

import {Commission} from '../../../../../domain/commission/model/commission';
import {Message} from '../../../../../domain/message/model/message';
import {Mapper} from '../../../../../domain/mapper';
import {CommissionsBatch} from '../../../../../domain/commission/model/commissions-batch';
import {MessagesBatch} from '../../../../../domain/commission/model/messages-batch';


export interface HttpGetMessagesModel {
  commissionId: string;
  messages: Message[];
}

export class HttpGetMessagesModelMapper extends Mapper<HttpGetMessagesModel, MessagesBatch> {
  mapFrom(param: HttpGetMessagesModel): MessagesBatch {
    return {
      commissionId: param.commissionId,
      messages: param.messages,
    };
  }

  mapTo(param: MessagesBatch): HttpGetMessagesModel {
    return {
      commissionId: param.commissionId,
      messages: param.messages,
    };
  }
}

import {Mapper} from '../../../../../domain/mapper';
import {Message} from '../../../../../domain/message/model/message';

export interface HttpCreateMessageModel {
  message: Message;
}

export class HttpCreateMessageModelMapper extends Mapper<HttpCreateMessageModel, Message> {
  mapFrom(param: HttpCreateMessageModel): Message {
    return param.message;
  }

  mapTo(param: Message): HttpCreateMessageModel {
    return {
      message: param
    };
  }
}

import './chat-message.resp';
import {ChatMessage} from "./chat-message";

export interface Chat {
  id: string;
  artistId: string;
  requesterId: string;

  messages: Array<ChatMessage>;

}

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
}

export interface ChatTextMessageModel extends ChatMessage {
  text: string;
}

export interface ChatPaidMessageModel extends ChatMessage {
  text: string;
}

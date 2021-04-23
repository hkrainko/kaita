export interface Message {
  id: string;
  commissionId: string;
  createTime: Date;
  state: MessageState;
  messageType: MessageType;
}

export interface TextMessage extends Message {
  from: string;
  text: string;
}

export interface ImageMessage extends Message {
  from: string;
  text?: string;
  imagePath: string;
}

export interface SystemMessage extends Message {
  text: string;
}

export enum MessageState {
  Sending = 'SENDING',
  Sent = 'SENT',
  Received = 'RECEIVED'
}

export enum MessageType {
  Text = 'Text',
  Image = 'Image',
  System = 'System',
}

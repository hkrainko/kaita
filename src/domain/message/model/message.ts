export interface Message {
    id: string;
    commissionId: string;
    createTime: string;
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
    systemMessageType: SystemMessageType;
}

export interface UploadProofCopySystemMessage extends SystemMessage {
    imagePath: string;
}

export interface UploadProductSystemMessage extends SystemMessage {
    filePath: string;
    displayImagePath?: string;
}

export interface AcceptProductSystemMessage extends SystemMessage {
    rating: number;
    comment?: string;
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

export enum SystemMessageType {
    Plain = 'Plain',
    UploadProofCopy = 'UploadProofCopy',
    UploadProduct = 'UploadProduct',
    AcceptProduct = 'AcceptProduct',
}

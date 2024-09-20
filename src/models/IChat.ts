export interface IChat {
  id: string;
  messages: IMessage[];
  createdAt: Date;
}

export interface IBaseMessage {
  message: string;
  response: string;
  quickOptions: string[];
  createdAt: Date;
  context: string;
}

export interface IMessage {
  id: string;
  createdAt: Date;
  edits: IBaseMessage[];
}

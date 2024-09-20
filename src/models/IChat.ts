export interface IChat {
  _id: string;
  messages: IMessage[];
  createdAt: string;
}

export interface IBaseMessage {
  message: string;
  response: string;
  quickOptions: string[];
  createdAt: string;
  context: string;
}

export interface IMessage {
  id: string;
  createdAt: string;
  edits: IBaseMessage[];
}

interface IBaseMessage {
  id: string;
  role: 'AI' | 'User';
  message: string;
  createdAt: Date;
}

interface IAIMessage extends IBaseMessage {
  role: 'AI';
  quickOptions: string[];
}

interface IUserMessage extends IBaseMessage {
  role: 'User';
  quickOptions?: never;
}

export type IMessage = IAIMessage | IUserMessage;

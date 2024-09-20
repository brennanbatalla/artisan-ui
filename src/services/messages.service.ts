import { IMessage } from '../models/IChat';

export const createMessage = async (message: string, context: string, chatId: string) => {
  console.log(chatId);
  return new Promise((resolve) => {
    setTimeout(() => {
      const messageBody: IMessage = {
        id: '3432424',
        createdAt: new Date(),
        edits: [
          {
            message,
            response: 'Hello world',
            quickOptions: [],
            createdAt: new Date(),
            context
          }
        ]
      };
      resolve(messageBody);
    }, 1000);
  });
};

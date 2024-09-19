import { WelcomeHeader } from './WelcomeHeader';
import { IMessage } from '../../../../../models/IMessage';
import { MessageContainer } from './MessageContainer';

export const ChatBody = () => {
  const messages: IMessage[] = [
    {
      id: '1',
      role: 'AI',
      message: 'Hello Brennan,\nHow can I assist you today?',
      createdAt: new Date(Date.now() - 1000 * 60),
      quickOptions: []
    },
    {
      id: '2',
      role: 'User',
      message: 'Hi Ava, I am new here. What can I do?',
      createdAt: new Date()
    },
    {
      id: '3',
      role: 'AI',
      message: 'Certainly, Welcome Brennan! You may ask me anything.',
      createdAt: new Date(),
      quickOptions: ['Build Monthly Report', 'Who is Ava?', 'What is the current context?']
    },
    {
      id: '4',
      role: 'User',
      message: 'Hi Ava, I am new here. What can I do?',
      createdAt: new Date()
    },
    {
      id: '5',
      role: 'AI',
      message: 'Certainly, Welcome Brennan! You may ask me anything.',
      createdAt: new Date(),
      quickOptions: ['Build Monthly Report', 'Who is Ava?', 'What is the current context?']
    }
  ];

  return (
    <div className={'flex-1 flex flex-col overflow-auto gap-2 pb-4'}>
      <WelcomeHeader />
      {messages
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((chatMessage) => (
          <MessageContainer key={chatMessage.id} messageBody={chatMessage} />
        ))}
    </div>
  );
};

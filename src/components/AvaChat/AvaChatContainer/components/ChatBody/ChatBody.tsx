import { WelcomeHeader } from './WelcomeHeader';
import { MessageContainer } from './MessageContainer';
import { IChat } from '../../../../../models/IChat';

interface Props {
  chat?: IChat;
}

export const ChatBody = ({ chat }: Props) => {
  return (
    <div className={'flex-1 flex flex-col overflow-auto gap-2 pb-4'}>
      <WelcomeHeader />
      {[...(chat?.messages || [])]
        ?.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((chatMessage) => <MessageContainer key={chatMessage.id} messageBody={chatMessage} />)}
    </div>
  );
};

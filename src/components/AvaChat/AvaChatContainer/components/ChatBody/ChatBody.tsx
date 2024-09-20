import { WelcomeHeader } from './WelcomeHeader';
import { MessageContainer } from './MessageContainer';
import { IChat } from '../../../../../models/IChat';
import { useEffect, useRef } from 'react';

interface Props {
  chat?: IChat;
}

export const ChatBody = ({ chat }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chat?.messages?.length) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref, chat?.messages]);

  return (
    <div ref={ref} className={'flex-1 flex flex-col overflow-auto gap-2 pb-4'}>
      <WelcomeHeader />
      {chat &&
        [...(chat?.messages || [])].map((chatMessage, i, items) => (
          <MessageContainer
            showOptions={i === items.length - 1}
            chat={chat}
            key={chatMessage.id}
            messageBody={chatMessage}
          />
        ))}
    </div>
  );
};

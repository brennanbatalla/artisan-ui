import { HeaderBar } from './components/HeaderBar';
import { ChatFooter } from './components/ChatFooter';
import { ChatBody } from './components/ChatBody/ChatBody';

export const AvaChatContainer = () => {
  return (
    <div className={'bg-white rounded-lg border shadow-2xl h-[700px] w-[400px] p-4 flex flex-col'}>
      <HeaderBar />
      <ChatBody />
      <ChatFooter />
    </div>
  );
};

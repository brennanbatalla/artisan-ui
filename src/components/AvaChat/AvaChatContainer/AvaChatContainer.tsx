import { HeaderBar } from './components/headerBar';
import { ChatHeader } from './components/ChatHeader';
import { ChatFooter } from './components/ChatFooter';

export const AvaChatContainer = () => {
  return (
    <div className={'bg-white rounded-lg border shadow-2xl h-[700px] w-[400px] p-4 flex flex-col'}>
      <HeaderBar />
      <div className={'flex-1 flex flex-col'}>
        <ChatHeader />
      </div>
      <ChatFooter />
    </div>
  );
};

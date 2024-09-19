import { AvaFAB } from './components/AvaFAB';
import { useAppSelector } from '../../redux/store';
import { isAvaChatOpen } from '../../redux/slices/chatSlice';
import { AvaChatContainer } from './AvaChatContainer/AvaChatContainer';

export const AvaChat = () => {
  const chatOpen = useAppSelector(isAvaChatOpen);

  return (
    <div className={'fixed bottom-3 right-3 lg:bottom-10 lg:right-10'}>
      {!chatOpen && <AvaFAB />}
      {chatOpen && <AvaChatContainer />}
    </div>
  );
};

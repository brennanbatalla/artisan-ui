import { AvaFAB } from './components/AvaFAB';
import { useAppSelector } from '../../redux/store';
import { isAvaChatOpen } from '../../redux/slices/chatSlice';

export const AvaChat = () => {
  const chatOpen = useAppSelector(isAvaChatOpen);

  return (
    <div className={'fixed bottom-3 right-3'}>
      {!chatOpen && <AvaFAB />}
      {chatOpen && <AvaFAB />}
    </div>
  );
};

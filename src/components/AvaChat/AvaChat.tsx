import { AvaFAB } from './components/AvaFAB';
import { useAppSelector } from '../../redux/store';
import { selectIsAvaChatOpen } from '../../redux/slices/chatSlice';
import { AvaChatContainer } from './AvaChatContainer/AvaChatContainer';

export const AvaChat = () => {
  const chatOpen = useAppSelector(selectIsAvaChatOpen);

  return (
    <div className={'fixed bottom-3 right-3 lg:bottom-10 lg:right-10'}>
      {!chatOpen && <AvaFAB />}
      {chatOpen && <AvaChatContainer />}
    </div>
  );
};

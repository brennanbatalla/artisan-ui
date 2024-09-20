import { AvaFAB } from './components/AvaFAB';
import { useAppSelector } from '../../redux/store';
import { selectIsAvaChatOpen, selectIsChatExpanded } from '../../redux/slices/chatSlice';
import { AvaChatContainer } from './AvaChatContainer/AvaChatContainer';

export const AvaChat = () => {
  const chatOpen = useAppSelector(selectIsAvaChatOpen);
  const isExpanded = useAppSelector(selectIsChatExpanded);

  return (
    <div
      className={`fixed ${isExpanded ? 'top-0 left-0' : 'bottom-3 right-3 lg:bottom-10 lg:right-10'}`}>
      {!chatOpen && <AvaFAB />}
      {chatOpen && <AvaChatContainer />}
    </div>
  );
};

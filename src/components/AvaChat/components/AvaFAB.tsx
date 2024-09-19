import { SparklesIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '../../../redux/store';
import { toggleChatOpen } from '../../../redux/slices/chatSlice';

export const AvaFAB = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(toggleChatOpen())}
      className={'btn btn-circle btn-primary lg:bottom-10 lg:right-10 shadow-2xl'}>
      <SparklesIcon className={'w-6 lg:w-8 text-white'} />
    </button>
  );
};

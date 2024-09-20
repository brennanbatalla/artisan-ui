import AVA_AVATAR from '../../../../../assets/avaHeadshot.png';
import { IBaseMessage, IChat } from '../../../../../models/IChat';
import { useAppDispatch } from '../../../../../redux/store';
import { sendMessage } from '../../../../../redux/slices/chatSlice';

interface Props {
  message: IBaseMessage;
  showOptions: boolean;
  chat: IChat;
}

export const AIMessage = ({ message, showOptions, chat }: Props) => {
  const dispatch = useAppDispatch();

  const onOptionClick = async (option: string) => {
    if (!chat) {
      return;
    }

    try {
      await dispatch(
        sendMessage({ message: option, context: message.context, chatId: chat._id })
      ).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={'flex gap-2'}>
      <img src={AVA_AVATAR} className={'rounded-full min-w-[40px] h-[40px]'} alt={'Ava'} />

      <div>
        <div
          className={`mt-[10px] max-w-[90%] whitespace-pre-wrap py-1 px-2 rounded-lg text-sm bg-gray-200`}>
          {message?.response || <div className={'loading'} />}
        </div>
        {message?.quickOptions?.length && showOptions ? (
          <div className={'flex gap-1 flex-wrap py-2'}>
            {message.quickOptions.slice(0, 4).map((option, i) => (
              <button
                onClick={() => onOptionClick(option)}
                className={'btn btn-primary btn-outline btn-xs rounded-full'}
                key={i}>
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

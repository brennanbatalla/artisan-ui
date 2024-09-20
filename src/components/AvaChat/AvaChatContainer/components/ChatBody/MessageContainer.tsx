import { IChat, IMessage } from '../../../../../models/IChat';
import { AIMessage } from './AIMessage';
import { UserMessage } from './UserMessage';
import { useState } from 'react';
import { useAppDispatch } from '../../../../../redux/store';
import { updateMessage } from '../../../../../redux/slices/chatSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
  messageBody: IMessage;
  chat: IChat;
  showOptions: boolean;
}

export const MessageContainer = ({ messageBody, chat, showOptions }: Props) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(messageBody.edits.length - 1);
  const currentMessage = messageBody?.edits?.[currentMessageIndex];
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdateMessage = async (input: string) => {
    if (!input || !currentMessage) {
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        updateMessage({
          message: input,
          context: currentMessage.context,
          chatId: chat._id,
          messageId: messageBody.id
        })
      ).unwrap();
      setEditMode(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageIndexChange = (direction: number) => {
    if (direction > 0) {
      if (currentMessageIndex + 1 <= messageBody.edits.length - 1) {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }
    } else if (currentMessageIndex - 1 >= 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
    }
  };

  return (
    <>
      <UserMessage
        message={currentMessage}
        editMode={editMode}
        setEditMode={setEditMode}
        loading={loading}
        submitEdit={handleUpdateMessage}
        messageId={messageBody.id}
        chatId={chat._id}
      />

      {!editMode && messageBody?.edits?.length > 1 ? (
        <div className={'flex gap-1 items-center text-gray-600'}>
          <span className={'flex-1'} />
          <button
            className={'btn btn-xs btn-ghost p-1'}
            onClick={() => handleMessageIndexChange(-1)}>
            <ChevronLeftIcon className={'w-4'} />
          </button>
          <p className={'text-xs'}>
            {currentMessageIndex + 1} of {messageBody.edits.length}
          </p>
          <button
            className={'btn btn-xs btn-ghost p-1'}
            onClick={() => handleMessageIndexChange(1)}>
            <ChevronRightIcon className={'w-4'} />
          </button>
        </div>
      ) : null}
      <AIMessage message={currentMessage} showOptions={showOptions} chat={chat} />
    </>
  );
};

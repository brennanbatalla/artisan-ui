import { IChat, IMessage } from '../../../../../models/IChat';
import { AIMessage } from './AIMessage';
import { UserMessage } from './UserMessage';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { selectChatError, updateMessage } from '../../../../../redux/slices/chatSlice';
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
  const deleteError = useAppSelector(selectChatError(`remove-${messageBody.id}`));
  const updateError = useAppSelector(selectChatError(`patch-${messageBody.id}`));

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
      console.error(e);
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

  useEffect(() => {
    if (messageBody?.edits?.length - 1 !== currentMessageIndex) {
      setCurrentMessageIndex(messageBody?.edits?.length - 1);
    }
  }, [messageBody?.edits]);

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

      {(deleteError || updateError) && (
        <p className={'text-error text-right text-sm'}>{deleteError || updateError}</p>
      )}

      {!editMode && messageBody?.edits?.length > 1 ? (
        <div className={'flex gap-1 items-center text-gray-600 pr-4'}>
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

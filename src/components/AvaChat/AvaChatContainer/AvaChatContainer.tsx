import { HeaderBar } from './components/HeaderBar';
import { ChatFooter } from './components/ChatFooter';
import { ChatBody } from './components/ChatBody/ChatBody';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  createChat,
  fetchChats,
  selectChat,
  selectChatError,
  selectChatInitialLoad,
  selectChats,
  selectIsChatExpanded,
  selectIsShowingChats,
  setActiveChat
} from '../../../redux/slices/chatSlice';
import { useEffect, useState } from 'react';

export const AvaChatContainer = () => {
  const activeChat = useAppSelector(selectChat());
  const chats = useAppSelector(selectChats);
  const initialLoad = useAppSelector(selectChatInitialLoad);
  const isExpanded = useAppSelector(selectIsChatExpanded);
  const dispatch = useAppDispatch();
  const fetchingError = useAppSelector(selectChatError('chats'));
  const showChats = useAppSelector(selectIsShowingChats);
  const [loadingNewChat, setLoadingNewChat] = useState(false);

  const handleCreateChat = async () => {
    try {
      setLoadingNewChat(true);
      await dispatch(createChat());
    } finally {
      setLoadingNewChat(false);
    }
  };

  useEffect(() => {
    if (initialLoad && !chats.length && !fetchingError) {
      dispatch(createChat());
    } else if (!initialLoad) {
      dispatch(fetchChats());
    }
  }, [initialLoad]);

  return (
    <div
      className={`bg-white rounded-lg border shadow-2xl ${isExpanded ? 'w-[100vw] h-[100vh]' : `h-[700px] ${showChats ? 'w-[600px]' : 'w-[400px]'}`} flex`}>
      {(showChats || isExpanded) && (
        <div className={'w-[200px] h-full bg-gray-50 flex flex-col'}>
          {chats.map((chat) => (
            <div
              onClick={() => dispatch(setActiveChat(chat))}
              key={chat._id}
              className={`rounded-md text-sm text-gray-600 overflow-ellipsis overflow-hidden whitespace-nowrap p-4 border-y cursor-pointer ${chat._id === activeChat?._id ? 'bg-primary-500 text-white' : 'hover:bg-gray-200 active:bg-gray-100'}`}>
              {chat.messages?.length
                ? chat.messages[chat.messages.length - 1].edits[0].message
                : 'New Chat!'}
            </div>
          ))}
          <span className={'flex-1'} />
          <button
            disabled={loadingNewChat}
            onClick={handleCreateChat}
            className={'btn btn-secondary w-2/3 mx-auto mb-2'}>
            {loadingNewChat ? <div className={'loading'} /> : 'Create Chat'}
          </button>
        </div>
      )}
      <div className={'flex flex-col h-full w-full p-4'}>
        {activeChat ? (
          <>
            <HeaderBar />
            <ChatBody chat={activeChat} />
            <ChatFooter chat={activeChat} />
          </>
        ) : (
          <div className={'flex w-full items-center justify-center h-1/3'}>
            {fetchingError ? (
              <div className={'text-error text-center'}>{fetchingError}</div>
            ) : (
              <div className={'loading'} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

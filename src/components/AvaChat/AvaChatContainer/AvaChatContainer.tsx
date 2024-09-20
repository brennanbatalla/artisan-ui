import { HeaderBar } from './components/HeaderBar';
import { ChatFooter } from './components/ChatFooter';
import { ChatBody } from './components/ChatBody/ChatBody';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  fetchChats,
  selectChats,
  selectChatInitialLoad,
  createChat,
  selectChat
} from '../../../redux/slices/chatSlice';
import { useEffect } from 'react';

export const AvaChatContainer = () => {
  const chat = useAppSelector(selectChat());
  const chats = useAppSelector(selectChats);
  const initialLoad = useAppSelector(selectChatInitialLoad);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO - fetch chats, if initial load and no chats, create one.

    if (initialLoad && !chats.length) {
      dispatch(createChat());
    } else if (!initialLoad) {
      dispatch(fetchChats());
    }
  }, [initialLoad]);

  return (
    <div className={'bg-white rounded-lg border shadow-2xl h-[700px] w-[400px] p-4 flex flex-col'}>
      {chat ? (
        <>
          <HeaderBar />
          <ChatBody chat={chat} />
          <ChatFooter chat={chat} />
        </>
      ) : (
        <div className={'flex w-full items-center justify-center h-1/3'}>
          <div className={'loading'} />
        </div>
      )}
    </div>
  );
};

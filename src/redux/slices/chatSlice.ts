import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetRedux } from '../customActions';
import { RootState } from '../store';
import { IChat, IMessage } from '../../models/IChat';
import {
  deleteMessage,
  getChats,
  patchMessage,
  postChat,
  postMessage
} from '../../services/chats.service';

type InitialState = {
  chatOpen: boolean;
  chats: IChat[];
  activeChat?: string;
  initialLoad: boolean;
  isSendingMessage: boolean;
  isExpanded: boolean;
  errors: Record<string, string>;
};

const initialState: InitialState = {
  chatOpen: false,
  initialLoad: false,
  isSendingMessage: false,
  chats: [],
  activeChat: '',
  isExpanded: false,
  errors: {}
};

// Async thunks below
export const fetchChats = createAsyncThunk('chat/fetchChats', async (_, { rejectWithValue }) => {
  try {
    return getChats();
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});

export const createChat = createAsyncThunk('chat/createChat', async (_, { rejectWithValue }) => {
  try {
    return postChat();
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    { message, context, chatId }: { message: string; context: string; chatId: string },
    { rejectWithValue }
  ) => {
    try {
      return postMessage(message, context, chatId);
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const updateMessage = createAsyncThunk(
  'chat/updateMessage',
  async (
    {
      message,
      context,
      chatId,
      messageId
    }: { message: string; context: string; chatId: string; messageId: string },
    { rejectWithValue }
  ) => {
    try {
      return patchMessage(message, context, chatId, messageId);
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const removeMessage = createAsyncThunk(
  'chat/deleteMessage',
  async ({ chatId, messageId }: { chatId: string; messageId: string }, { rejectWithValue }) => {
    try {
      return deleteMessage(chatId, messageId);
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState: initialState,
  reducers: {
    toggleChatOpen: (state: InitialState) => {
      state.chatOpen = !state.chatOpen;
      if (!state.chatOpen && state.isExpanded) {
        state.isExpanded = false;
      }
    },
    toggleChatExpansion: (state: InitialState) => {
      state.isExpanded = !state.isExpanded;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId } = action.meta.arg;
        state.isSendingMessage = false;
        const chat = state.chats.find((c) => c._id === chatId);
        if (chat) {
          chat.messages = chat.messages.filter((message) => !message.id.includes('temp'));
          chat.messages.push(action.payload as IMessage);
        }
        state.errors[chatId] = '';
      })
      .addCase(sendMessage.pending, (state, action) => {
        const { chatId, message, context } = action.meta.arg;
        const chat = state.chats.find((c) => c._id === chatId);
        state.isSendingMessage = true;

        if (chat) {
          chat.messages.push({
            id: `temp-${Date.now()}`,
            createdAt: new Date().toDateString(),
            edits: [
              {
                message,
                response: '',
                context,
                createdAt: new Date().toDateString(),
                quickOptions: []
              }
            ]
          });
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSendingMessage = false;
        state.errors[action.meta.arg.chatId] = action.error.message || 'Failed to send message';
      });

    builder
      .addCase(removeMessage.fulfilled, (state, action) => {
        const { chatId, messageId } = action.meta.arg;
        const chat = state.chats.find((c) => c._id === chatId);
        if (chat) {
          chat.messages = chat.messages.filter((message) => message.id !== messageId);
        }
        state.errors[`remove-${action.meta.arg.messageId}`] = '';
      })
      .addCase(removeMessage.rejected, (state, action) => {
        state.errors[`remove-${action.meta.arg.messageId}`] =
          action.error.message || 'Failed to delete message.';
      });

    builder
      .addCase(updateMessage.fulfilled, (state, action) => {
        const { chatId } = action.meta.arg;
        state.isSendingMessage = false;
        const chat = state.chats.find((c) => c._id === chatId);
        if (chat) {
          const updatedMessage = action.payload as IMessage;
          chat.messages = chat.messages.map((message) => {
            if (message.id === updatedMessage.id) {
              return updatedMessage;
            }
            return message;
          });
        }
      })
      .addCase(updateMessage.pending, (state) => {
        state.isSendingMessage = true;
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.isSendingMessage = false;
        state.errors[`patch-${action.meta.arg.messageId}`] =
          action.error.message || 'Failed to update message.';
      });

    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.initialLoad = true;
        state.errors['chats'] = '';
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.initialLoad = true;
        state.errors['chats'] =
          action.error?.message || 'Failed to fetch chats. Please contact us.';
      });

    builder.addCase(createChat.fulfilled, (state, action) => {
      state.chats.push(action.payload);
    });

    builder.addCase(resetRedux, () => initialState);
  }
});

// Action creators are generated for each case reducer function

export const { toggleChatOpen, toggleChatExpansion } = chatSlice.actions;

// Selectors

export const selectIsAvaChatOpen = (state: RootState) => state.chatSlice.chatOpen;
export const selectChatInitialLoad = (state: RootState) => state.chatSlice.initialLoad;
export const selectChats = (state: RootState) => state.chatSlice.chats;
export const selectIsSendingMessage = (state: RootState) => state.chatSlice.isSendingMessage;
export const selectIsChatExpanded = (state: RootState) => state.chatSlice.isExpanded;
export const selectChat = (id?: string) => (state: RootState) =>
  id ? state.chatSlice.chats.find((c) => c._id === id) : state.chatSlice.chats?.[0];
export const selectChatError = (id: string) => (state: RootState) =>
  state.chatSlice.errors?.[id] || '';

export default chatSlice.reducer;

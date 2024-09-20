import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetRedux } from '../customActions';
import { RootState } from '../store';
import { IChat, IMessage } from '../../models/IChat';
import { createMessage } from '../../services/messages.service';

type InitialState = {
  chatOpen: boolean;
  chats: IChat[];
  activeChat?: string;
};

const initialState: InitialState = {
  chatOpen: false,
  chats: [
    {
      id: 'dffs23223',
      createdAt: new Date(),
      messages: [
        {
          id: '1',
          createdAt: new Date(Date.now() - 1000 * 60),
          edits: [
            {
              message: 'Hi Ava, I am new here. What can I do?',
              response: 'Hello Brennan,\nHow can I assist you today?',
              createdAt: new Date(Date.now() - 1000 * 60),
              quickOptions: [],
              context: 'Onboarding'
            }
          ]
        },
        {
          id: '2',
          createdAt: new Date(Date.now() - 1000 * 40),
          edits: [
            {
              message: 'Certainly, Welcome Brennan! You may ask me anything.',
              response: 'Hi Ava, I am new here. What can I do?',
              createdAt: new Date(),
              quickOptions: ['Build Monthly Report', 'Who is Ava?', 'What is the current context?'],
              context: 'Onboarding'
            }
          ]
        }
      ]
    }
  ],
  activeChat: ''
};

// Async thunks below
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    { message, context, chatId }: { message: string; context: string; chatId: string },
    { rejectWithValue }
  ) => {
    try {
      return createMessage(message, context, chatId);
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId } = action.meta.arg;
        const chat = state.chats.find((c) => c.id === chatId);
        if (chat) {
          chat.messages = chat.messages.filter((message) => !message.id.includes('temp'));
          chat.messages.push(action.payload as IMessage);
        }
      })
      .addCase(sendMessage.pending, (state, action) => {
        const { chatId, message, context } = action.meta.arg;
        const chat = state.chats.find((c) => c.id === chatId);
        console.log('PENDING');
        if (chat) {
          chat.messages.push({
            id: `temp-${Date.now()}`,
            createdAt: new Date(),
            edits: [
              {
                message,
                response: '',
                context,
                createdAt: new Date(),
                quickOptions: []
              }
            ]
          });
        }
      });
    builder.addCase(resetRedux, () => initialState);
  }
});

// Action creators are generated for each case reducer function

export const { toggleChatOpen } = chatSlice.actions;

// Selectors

export const isAvaChatOpen = (state: RootState) => state.chatSlice.chatOpen;
export const selectChat = (id?: string) => (state: RootState) =>
  id ? state.chatSlice.chats.find((c) => c.id === id) : state.chatSlice.chats?.[0];

export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { resetRedux } from '../customActions';
import { RootState } from '../store';

type InitialState = {
  chatOpen: boolean;
  chats: any[];
  activeChat?: string;
};

const initialState: InitialState = {
  chatOpen: false,
  chats: [],
  activeChat: ''
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState: initialState,
  reducers: {
    toggleChatOpen: (state: InitialState) => {
      state.chatOpen = !state.chatOpen;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetRedux, () => initialState);
  }
});

// Action creators are generated for each case reducer function

export const { toggleChatOpen } = chatSlice.actions;

// Selectors

export const isAvaChatOpen = (state: RootState) => state.chatSlice.chatOpen;

export default chatSlice.reducer;

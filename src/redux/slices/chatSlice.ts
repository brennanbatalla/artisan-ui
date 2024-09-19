import { createSlice } from '@reduxjs/toolkit';
import { resetRedux } from '../customActions';

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetRedux, () => initialState);
  }
});

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const {} = chatSlice.actions;

// Selectors

export default chatSlice.reducer;

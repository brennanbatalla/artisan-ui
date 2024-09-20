import { API_URL } from '../shared/constants';
import axios from 'axios';

export const postChat = async () => {
  const { data } = await axios.post(`${API_URL}/chats`);
  return data;
};

export const getChats = async () => {
  const { data } = await axios.get(`${API_URL}/chats`);
  return data;
};

export const postMessage = async (message: string, context: string, chatId: string) => {
  const { data } = await axios.post(`${API_URL}/chats/${chatId}/messages`, {
    message,
    context,
    chatId
  });
  return data;
};

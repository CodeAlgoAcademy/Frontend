import { getAccessToken } from 'utils/getTokens';
import http from '../axios.config';

const config = {
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
};

const getConversations: any = async () => {
  const response = await http.get('/chat/teacher/', config);
  return response.data;
};

const getMessages: any = async (id: number) => {
  const response = await http.get(`/chat/teacher/message/${id}`, config);
  return response.data;
};

const messageService = {
  getConversations,
  getMessages,
};

export default messageService;

import { getAccessToken } from "utils/getTokens";
import http from "../axios.config";

const config = {
   headers: {
      Authorization: `Bearer ${getAccessToken()}`,
   },
};

const getTeacherConversations: any = async () => {
   const response = await http.get("/chat/teacher/", {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const getTeacherMessages: any = async (id: number) => {
   const response = await http.get(`/chat/teacher/message/${id}`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const getParentMessages: any = async (id: number) => {
   const response = await http.get(`/chat/parent/message/${id}`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const messageService = {
   getTeacherConversations,
   getTeacherMessages,
   getParentMessages,
};

export default messageService;

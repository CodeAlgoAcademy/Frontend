import { IParentChild } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";
import http from "../axios.config";

const addChild = async (data: any) => {
   const response = await http.post("/parent/child/", data, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   return response.data;
};

const addChildFriends = async (data: any) => {
   const response = await http.post("/parent/child/friend-request/", data, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   return response.data;
};

const getAllChildren = async () => {
   const response = await http.get("/parent/child/", {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const getProgress = async (id: string | number) => {
   const response = await http.get(`/parent/child/${id}/progress/`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const updateChildScreentime = async (data: any, id: string | number) => {
   const response = await http.put(
      "/parent/child/time-limit/" + id + "/",
      { ...data },
      {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      }
   );

   return response.data;
};

const replyFriendRequest = async (data: { accepted: boolean; rejected: boolean }, id: number) => {
   const response = await http.put(
      `/parent/child/friend-request/${id}`,
      { ...data },
      {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      }
   );
   return response.data;
};

const parentService = {
   addChild,
   addChildFriends,
   getAllChildren,
   updateChildScreentime,
   replyFriendRequest,
   getProgress,
};

export default parentService;

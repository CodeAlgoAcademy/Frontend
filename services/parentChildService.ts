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
   const response = await http.post("/parent/child/add-friend/", data, {
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

const updateChildScreentime = async (data: any, id: string | number) => {
   const response = await http.put("/parent/child/" + id, data, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   return response.data;
};

const parentService = {
   addChild,
   addChildFriends,
   getAllChildren,
   updateChildScreentime,
};

export default parentService;

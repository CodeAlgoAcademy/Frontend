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

const parentService = {
   addChild,
   addChildFriends,
};

export default parentService;

import { IParentChild } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";
import http from "../axios.config";

const addChild = async (data: any) => {
   console.log(data);
   const response = await http.post("/parent/child/", data, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   return response.data;
};

const addChildScreentime = async (data: { screentime: any }) => {
   const response = await http.put("", data, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
};

const parentService = {
   addChild,
   addChildScreentime,
};

export default parentService;

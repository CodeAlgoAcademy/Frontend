import { Student } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";
import http from "../axios.config";

const addStudent = async (data: Student, id: string) => {
   const finalData = {
      student: data,
   };
   const response = await http.post(`/academics/class/${id}/student`, finalData, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   return response.data;
};

const getStudents = async (id: string) => {
   const response = await http.get(`/academics/class/${id}/student`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const studentService = {
   addStudent,
   getStudents,
};

export default studentService;

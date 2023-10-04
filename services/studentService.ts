import { ISingleStudent } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";
import http from "../axios.config";

const addStudent = async (data: ISingleStudent, id: string) => {
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
   return response.data?.students;
};

const getSingleStudent = async (classId: number, studentId: number) => {
   const response = await http.get(`/academics/class/${classId}/student/${studentId}`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

   return response.data?.student;
};

const studentService = {
   addStudent,
   getStudents,
   getSingleStudent,
};

export default studentService;

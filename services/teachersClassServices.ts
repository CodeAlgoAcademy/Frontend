import http from "axios.config";
import { IChildTopics } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";

const bulkUpdateClassLevelThreshold = async (
  class_id: string | number,
  data: { grade: string; level: number }
) => {
  const response = await http.patch(
    `academics/class/${class_id}/levelthreshold/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return response.data;
};

const bulkUpdateClassScreenTime = async (
  class_id: string | number,
  data: { timeLimit: number | string | null; dayOfTheWeek: string }
) => {
  const response = await http.patch(
    `academics/class/${class_id}/screentime/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return response.data;
};

const getStudentLineProgressByTeacher = async (studentId: string, classId:string) => {
   try {
      const response = await http.get<IChildTopics>(`/academics/class/${classId}/student/${studentId}/progress`, {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });

      console.log(response?.data);
      return response?.data;
   } catch (error) {
      // throw error;
   }
};

const getStudentLinecodingSkillsByTeacher = async (studentId: string, classId: string) => {
   const response = await http.get(`/academics/class/${classId}/student/${studentId}/skills`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
   });
   return response.data; 
};


const getStudentLineProgressNewByTeacher = async (studentId: string, classId: string) => {
    try {
      const response = await http.get(`/academics/class/${classId}/student/${studentId}/line-standards/`, {
         headers: { Authorization: `Bearer ${getAccessToken()}` },
      });
      // Always return an array or object, never undefined
      return response?.data || []; 
   } catch (error) {
      console.error(error);
      return []; // Return empty array on error
   }
};

const getStudentLinecodingSkillsNewByTeacher = async (studentId: string, classId: string) => {
   try {
      const response = await http.get(
         `/academics/class/${classId}/student/${studentId}/line-skills/`, 
         {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
         }
      );
      return response.data; 
   } catch (error) {
      console.error("Error fetching Python Skills:", error);
   }
};



const teachersClassBaseServices = {
  bulkUpdateClassLevelThreshold,
  bulkUpdateClassScreenTime,
  getStudentLineProgressByTeacher,
  getStudentLinecodingSkillsByTeacher,
  getStudentLinecodingSkillsNewByTeacher,
  getStudentLineProgressNewByTeacher
};

export default teachersClassBaseServices;
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";



const createStudentLevelThresHold = async (
  data: any,
  class_id: string | number,
  student_id: string | number
) => {
  const response = await http.post(
    `/academics/class/${class_id}/student/${student_id}/level-threshold/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return response.data;
};

const editStudentScreentimeteachers = async (
  data: any,
  class_id: string | number,
  student_id: string | number,
  id: string | number
) => {
  const response = await http.put(
    `/academics/class/${class_id}/student/${student_id}/screen-time/${id}/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return response.data;
};

const getStudentBlockGameProgress = async (class_id: string | number, student_id:string | number) => {
   const response = await http.get(`/academics/class/${class_id}/student/${student_id}/block-progress/`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const getStudentBlockGameSkill = async (class_id: string | number, student_id:string | number) => {
   const response = await http.get(`/academics/class/${class_id}/student/${student_id}/block-skills/`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};
const getStudentBlockGameStandard = async (class_id: string | number, student_id:string | number) => {
   const response = await http.get(`/academics/class/${class_id}/student/${student_id}/block-standards/`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};


const teachersStudentServices={
    createStudentLevelThresHold,
    editStudentScreentimeteachers,
    getStudentBlockGameProgress,
    getStudentBlockGameSkill,
    getStudentBlockGameStandard


}
export default teachersStudentServices;
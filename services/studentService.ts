import { IChildProgress, IChildTopics, ISingleStudent } from "types/interfaces";
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

const getClassProgressSummary = async (class_id: string) => {
   const response = await http.get(`/academics/class/${class_id}/progress-summary`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const getSingleStudent = async (classId: number, studentId: number) => {
   console.log(classId, studentId);
   const response = await http.get(`/academics/class/${classId}/student/${studentId}`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

   return response.data?.student;
};

const getStudentProgressByTeacher = async (studentId: string, classId: string) => {
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
const getStudentBlockProgressByTeacher = async (studentId: string) => {
   try {
      const response = await http.get<IChildTopics>(`/academics/class/student/${studentId}/progress`, {
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

const moveStudents = async (payload: { studentIds: Array<string | number>; sourceClassId: string | number; targetClassId: string | number }) => {
   const response = await http.post(`/academics/class/move-students`, payload, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const transferStudentsOwner = async (payload: { studentIds: Array<string | number>; sourceClassId: string | number; newTeacherId: string | number; newClassId: string | number }) => {
   const response = await http.patch(`/academics/student/transfer-owner`, payload, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const getOrganizationTeachers = async (orgId: string | number) => {
   const response = await http.get(`/organization/${orgId}/teachers`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const getTeacherClasses = async (teacherId: string | number) => {
   const response = await http.get(`/academics/teacher/${teacherId}/classes`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const studentService = {
   addStudent,
   getStudents,
   getSingleStudent,
   getStudentProgressByTeacher,
   getClassProgressSummary,
   moveStudents,
   transferStudentsOwner,
   getOrganizationTeachers,
   getTeacherClasses,
};

export default studentService;

import http from "axios.config";
import { CreateAssignmentBulkPayload, CreateAssignmentPayload, MathFactAnalyticsPair, MathFactAssignmentDetail, MathFactAssignmentList, MathFactSet, StudentMathOverview } from "types/interfaces/mathfact";
import { getAccessToken } from "utils/getTokens";

const mathFactsService = {
  getFactSets: async (classId: string | number): Promise<MathFactSet[]> => {
    const res = await http.get(`/academics/class/${classId}/math-facts/fact-sets/`, {
        headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
  },
 
getAssignments: async (classId: string | number): Promise<StudentMathOverview[]> => {
    const res = await http.get(`/academics/class/${classId}/math-facts/assignments/`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
},
 
  getAssignment: async (classId: string | number, pk: number): Promise<MathFactAssignmentDetail> => {
    const res = await http.get(`/academics/class/${classId}/math-facts/assignments/${pk}/`,{
        headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
  },
 
 createAssignment: async (
  classId: string | number,
  payload: {
    fact_set_ids: number[];
    student_ids: number[];
    question_count: number;
    target_accuracy: number;
    target_avg_time: number;
    status: string;
  }
): Promise<any> => {
  const res = await http.post(`/academics/class/${classId}/math-facts/assignments/`, payload, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return res.data;
},

  getStudentOverview: async (classId: string | number): Promise<any[]> => {
    const res = await http.get(`/academics/class/${classId}/math-facts/assignments/`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
  },

  updateAssignment: async (
    classId: string | number,
    pk: number,
    payload: Partial<CreateAssignmentPayload>
  ): Promise<MathFactAssignmentDetail> => {
    const res = await http.patch(`/academics/class/${classId}/math-facts/assignments/${pk}/`, payload,{
        headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
  },
 
  deleteAssignment: async (classId: string | number, pk: number): Promise<void> => {
    await http.delete(`/academics/class/${classId}/math-facts/assignments/${pk}/`,{
        headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  },

  getAnalytics: async (
  classId: string | number,
  studentId?: string | number,
  operation?: string
): Promise<MathFactAnalyticsPair[]> => {
  const params = new URLSearchParams();
  if (studentId && studentId !== "all") params.set("student_id", String(studentId));
  if (operation && operation !== "all") params.set("operation", operation);

  const res = await http.get(
    `/academics/class/${classId}/math-facts/analytics/?${params.toString()}`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
  return res.data;
},

};
 
export default mathFactsService;
 





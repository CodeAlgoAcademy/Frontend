import http from "axios.config";
import { CreateAssignmentPayload, MathFactAssignmentDetail, MathFactAssignmentList, MathFactSet } from "types/interfaces/mathfact";
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
 
  getAssignments: async (classId: string | number): Promise<MathFactAssignmentList[]> => {
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
    payload: CreateAssignmentPayload
  ): Promise<MathFactAssignmentDetail> => {
    const res = await http.post(`/academics/class/${classId}/math-facts/assignments/`, payload, {
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
};
 
export default mathFactsService;
 





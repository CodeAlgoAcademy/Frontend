import http from "axios.config";
import { AssignmentListItem, BlockStandardWithTopics, CreateAssignmentPayload } from "types/interfaces/assignments";
import { getAccessToken } from "utils/getTokens";


export const getSkillPicker = async (class_id: string | number, grade?: string) => {
  const params = grade ? `?grade=${grade}` : "";
  const response = await http.get(
    `/academics/block_game/assignments/skill-picker/${params}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return response.data as BlockStandardWithTopics[];
};
 
export const getClassAssignments = async (class_id: string | number) => {
  const response = await http.get(
    `/academics/class/${class_id}/assignments/`,
   {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return response.data as AssignmentListItem[];
};
 
export const createAssignment = async (
  class_id: string | number,
  data: CreateAssignmentPayload
) => {
  const response = await http.post(
    `/academics/class/${class_id}/assignments/`,
    data,
  {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return response.data;
};
export const getSinglAssignment = async (
  class_id: string | number,
  assignment_id: string | number
) => {
  const response = await http.get(
    `/academics/class/${class_id}/assignments/${assignment_id}/`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
  return response.data;
};
 
export const archiveAssignment = async (class_id: string | number, assignment_id: string | number) => {
  const response = await http.patch(
    `/academics/class/${class_id}/assignments/${assignment_id}/`,
    {},
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
  return response.data;
};

export const deleteAssignment = async (class_id: string | number, assignment_id: string | number) => {
  const response = await http.delete(
    `/academics/class/${class_id}/assignments/${assignment_id}/`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
  return response.data;
};
 
export const getAssignmentResults = async (
  class_id: string | number,
  assignment_id: string | number
) => {
  const response = await http.get(
    `/academics/class/${class_id}/assignments/${assignment_id}/results/`,
{
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }  );
  return response.data;
};


export const updateAssignment = async (
  class_id: string | number,
  assignment_id: string | number,
  data: Partial<CreateAssignmentPayload>
) => {
  const response = await http.patch(
    `/academics/class/${class_id}/assignments/${assignment_id}/`,
    data,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
  return response.data;
};

const assignmentServices = {
  getSkillPicker,
  getClassAssignments,
  createAssignment,
  archiveAssignment,
  deleteAssignment, 
  getAssignmentResults,
  updateAssignment,
  getSinglAssignment,
};
 
export default assignmentServices;
 
import http from "axios.config";
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

const teachersClassBaseServices = {
  bulkUpdateClassLevelThreshold,
  bulkUpdateClassScreenTime
};

export default teachersClassBaseServices;
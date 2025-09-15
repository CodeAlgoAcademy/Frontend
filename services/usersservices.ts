import http from "axios.config";
import { getAccessToken } from "utils/getTokens";

const getUserStudentInfo = async () => {
   const response = await http.get(`/users/student-info`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const usersStudentServices={
    getUserStudentInfo
}
export default usersStudentServices;
import { Student } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";
import http from "../axios.config";

const config = {
    headers: {
        Authorization: `Bearer ${getAccessToken()}`
    }
}

const addStudent = async(data: Student) => {
    const finalData = {
        student: data
    }
    const response = await http.post('/academics/class/14/student', finalData, config);

    return response.data;
}

const getStudents = async() => {
    const response = await http.get('/academics/class/14/student', config)

    return response.data;
}

const studentService = {
    addStudent,
    getStudents
}

export default studentService;
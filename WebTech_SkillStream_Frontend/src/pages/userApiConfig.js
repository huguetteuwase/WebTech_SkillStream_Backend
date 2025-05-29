import axios from "axios";

const API_URL = "http://localhost:8080/api/users";



export const getAdminUsers = async () => {
    const response = await axios.get(`${API_URL}/admin`);
    return response.data;
}

import axios from "axios"
import { baseURL } from "./api"

interface loginForm {
    username: string
    password: string
}

export const loginRequest = async (data: loginForm): Promise<string> => {
    const response = await axios.post(`${baseURL}/auth/login`, data)
    return response.data.access_token;
}
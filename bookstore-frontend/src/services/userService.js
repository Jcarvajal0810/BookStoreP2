import axios from "axios";
import { API_URLS } from "../config";

const baseURL = API_URLS.user;

export async function registerUser(userData) {
    const res = await axios.post(`${baseURL}/register`, userData);
    return res.data;
}

export async function loginUser(username, password) {
    const res = await axios.post(`${baseURL}/login`, { username, password });
    return res.data;
}

export async function logoutUser() {
    const res = await axios.post(`${baseURL}/logout`);
    return res.data;
}

export async function getAuthStatus() {
    const res = await axios.get(`${baseURL}/status`);
    return res.data;
}

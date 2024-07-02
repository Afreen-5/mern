import axios from "axios";

const BASE_URL = 'http://localhost:8000/api';

export const login = async(username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/signin`, {username, password});
    if(response.data.access_Token) {
        localStorage.setItem('token', response.data.access_Token);
    }
    if(response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user) );
    }
    return response.data;
}

export const logout = () => {
    localStorage.removeItem('token');
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const isAuthenticated = () => {
    return !!getToken();
}
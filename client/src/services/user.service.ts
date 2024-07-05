import axios from "axios"

const BASE_URL = 'http://localhost:8000/api/users'

export const addUsers = async(user: any) => {
    try {
        const response = await axios.post(`${BASE_URL}`, user);
        console.log(response.data, "Created User");
        return response.data;
    } catch (error) {
        console.error("Error adding user", error);
        return null;
    }
} 

export const getAllUsers = async() => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
           headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log(response.data, "All Users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users", error);
        return null;
    }
}

export const fetchUser = async(id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/:${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log(response.data, "Fetched user");
        return response.data;
    } catch (error) {
        console.error("Error fetching a user", error);
        return null;
    }
}

export const updateUser = async(id: string, user: any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/:${id}`, user, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log(response.data, "Updated user");
        return response.data;
    } catch (error) {
        console.error("Error updating user", error);
        return null;
    }
}

export const deleteUser = async(id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/:${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log(response.data, "Deleted user");
        return response.data;
    } catch (error) {
        console.error("Error deleting user", error);
        return null;
    }
}

export const getUserByRole = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/by-role`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log(response.data, "Users by role");
        return response.data;
    } catch (error) {
        console.error("Error fetching role based User");
        return null;
    }

}

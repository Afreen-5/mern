import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/movies';

export const addMovies = async (movie: any) => {
    try {
        const response = await axios.post(`${BASE_URL}`, movie, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log("Movies posted", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to add movie data", error);
        return null;
    }
}

export const getAllMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        console.log("Fetched movies", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch movies", error);
        return null;
    }
}

export const fetchMovie = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        console.log("Fetched movie", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch movie", error);
        return null;
    }
}

export const updateMovie = async (id: string, movie: any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, movie, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log("Updated movie", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to update movie", error);
        return null;
    }
}

export const deleteMovie = async (id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log("Deleted movie", response.data);
    } catch (error) {
        console.error("Failed to delete movie", error);
        return null;
    }
}
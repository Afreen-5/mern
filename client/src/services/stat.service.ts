import axios from "axios";

const BASE_URL = 'http://localhost:8000/api';

export const moviesCount = async ()=> {
    try {
        const response = await axios.get(`${BASE_URL}/movies/count`);
        console.log("Movies count fetched successfully", response);
        return response;
    } catch (error) {
        console.error("Failed to fetch movies count", error);
        return null;
    }
}

export const genresCount = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/genres/count`)
        console.log("Successfully fetched genres count", response);
        return response;
    } catch (error) {
        console.error("Failed to fetch genres count", error);
        return null;
    }
}

export const getStatsCount = () => {
    return{ moviesCount, genresCount }
} 

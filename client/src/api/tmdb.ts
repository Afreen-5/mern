import axios from "axios";

const API_KEY = '90d4be4a96e8ee513a15b076908f391d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (category: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${category}`,{
            params: {api_key: API_KEY}
        });
        console.log("Successfully fetched data");
        return response.data;
        
    } catch (error) {
        console.log("Error fetching data", error);
        return [];   
    }
}

export const fetchMovieDetails = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movies/${id}`,{
            params: { api_key: API_KEY }
        });
        console.log("Successfully fetched Movies details data");
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details data", error);
        return null;
    }
}

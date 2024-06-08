import axios from "axios";

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ0YmU0YTk2ZThlZTUxM2ExNWIwNzY5MDhmMzkxZCIsInN1YiI6IjY2NWYzYmFmOTYxNThhM2M3ZjlkNmJlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5rQifrZZUrSG94jYM-3WdcQ1GF9Wa8ZujeSOaNF17M';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (category: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/movies/${category}`,{
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

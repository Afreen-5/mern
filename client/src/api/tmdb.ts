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
        const response = await axios.get(`${BASE_URL}/movie/${id}`,{
            params: { api_key: API_KEY }
        });
        console.log("Successfully fetched Movies details data");
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details data", error);
        return null;
    }
}

export const fetchMovieVideos = async (movieId: number) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
        params: {
            api_key: 'YOUR_API_KEY',
            language: 'en-US',
        },
    });
    return response.data.results.filter((video: any) => video.type === 'Trailer');
};


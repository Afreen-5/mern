import axios from "axios";

const API_KEY = '90d4be4a96e8ee513a15b076908f391d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (category: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${category}`,{
            params: {api_key: API_KEY}
        });
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
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details data", error);
        return null;
    }
}

export const fetchMovieVideos = async (movieId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
            params: {
                api_key:  API_KEY,
                language: 'en-US',
            },
        });
        return response.data.results.filter((video: any) => video.site === 'YouTube' && video.type === 'Trailer');
    } catch (error) {
        console.log("Error fetching video", error)
        return null;
    }
};

export const fetchTrendingMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Top rated movies data", error);
        return null;
    }
}

export const movieReviews = async (movie_id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movie_id}/reviews?language=en-US&page=1`, {
            params: {api_key: API_KEY}
        });
        console.log("Reveiws fetched successfully", response.data.results);
        return response.data.results;
    } catch (error) {
        console.error("Failed to fetch movie reviews");
        return [];
    }
}
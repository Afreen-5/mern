import { useEffect, useState } from "react";
import { fetchMovieVideos, fetchTrendingMovies } from "../api/tmdb";

const MovieTrailer: React.FC = () => {
    const [trailer, setTrailer] = useState<any[]>([])

    useEffect( () => {
        const loadTrailer = async () => {
            const trendingMovies = await fetchTrendingMovies();
            trendingMovies.map( async (movie: any) => {
                const videos = await fetchMovieVideos(movie.id);
                console.log(videos);
                setTrailer(videos);
            } )
        }; loadTrailer()
    }, [] )

    return (
        <iframe className="w-full h-64 md:h-80" src="https://www.youtube.com/embed/zi9vU7Iowag?autoplay=1&amp;playback_rate=1"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe> 
    )
}

export default MovieTrailer;


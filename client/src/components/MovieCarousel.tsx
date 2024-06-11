import { useEffect, useState } from "react";
import { fetchMovieVideos, fetchMovies } from "../api/tmdb";
import { MovieCardProps } from "./MovieCard";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieCarousel = () => {
    const [trailers, setTrailers] = useState<MovieCardProps[]>([]);

    useEffect(() => {
        const getTrailers = async () => {
            const popularMovies = await fetchMovies('popular');
            const allTrailers = await Promise.all(
                popularMovies.map(async (movie: any) => {
                    const movieTrailers = await fetchMovieVideos(movie.id);
                    return { movie, trailers: movieTrailers };
                })
            );
            setTrailers(allTrailers.flatMap(t => t.trailers));
        };

        getTrailers();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, // 5 seconds for each slide
        nextArrow: <div className="next-arrow">Next</div>,
        prevArrow: <div className="prev-arrow">Previous</div>
    };

    return (
        <div className="w-full h-screen h-90vh bg-gray-900">
            <Slider {...settings}>
                {trailers.map((trailer: any) => (
                    <div key={trailer.id} className="relative h-screen">
                        <iframe
                            className="absolute w-full h-full"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={trailer.name}
                        ></iframe>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MovieCarousel;
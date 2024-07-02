import React, { useEffect, useState } from "react";
import { fetchMovies } from "../../services/tmdb.service";
import Slider from "react-slick";
export interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  };
}

const MovieCard: React.FC = () => {
  const [popular, setPopular] = useState<any[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const popularMovies = await fetchMovies("popular");
      setPopular(popularMovies.results);
    };
    loadMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablet screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // Adjust for mobile screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480, // Adjust for smaller mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const imageUrl = `https://image.tmdb.org/t/p/w500`;
  return (
    <>
      <div className="container mx-auto ">
        <p className="my-8">MX Popular Shows</p>
        <Slider {...settings}>
          {popular.map((movie) => (
            <div key={movie.id} className="px-2">
              <img
                className="w-full h-80 rounded-lg object-cover hover:scale-125"
                src={`${imageUrl}${movie.poster_path}`}
                alt={movie.original_title}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{movie.title}</div>
                <p className="text-gray-700 text-base">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default MovieCard;

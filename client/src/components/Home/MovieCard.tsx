import React, { useEffect, useState } from "react";
import { fetchMovies } from "../../services/tmdb.service";
import Slider from "react-slick";

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
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Large mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480, // Small mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const imageUrl = `https://image.tmdb.org/t/p/w400`;
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h3 className="ml-4 mb-8 text-lg md:text-xl font-semibold">MX Popular Shows</h3>
      <Slider {...settings}>
        {popular.map((movie) => (
          <div key={movie.id} className="px-2">
            <img
              className="w-full h-64 md:h-80 rounded-lg object-cover transition-transform transform hover:scale-110"
              src={`${imageUrl}${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div className="px-2 md:px-6 py-2 md:py-4">
              <h4 className="font-bold text-sm md:text-xl mb-2">{movie.title}</h4>
              <p className="text-xs md:text-base text-orange-700">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCard;

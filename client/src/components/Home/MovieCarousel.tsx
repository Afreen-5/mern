import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchTrendingMovies } from "../../services/tmdb.service";
import { useNavigate } from 'react-router-dom';

const MovieCarousel: React.FC = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await fetchTrendingMovies();
        setTopRatedMovies(response.results);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setIsLoading(false);
      }
    };
    fetchTopMovies();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const imageUrl = `https://image.tmdb.org/t/p/original`;

  const handleMoreInfo = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {topRatedMovies.map((movie) => (
          <div key={movie.id} className="relative w-full h-[80vh] md:h-[90vh]">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${imageUrl}${movie.backdrop_path || movie.poster_path})`,
                }}
              >
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-row items-end justify-between p-6 md:p-8 lg:p-12">
                      <div className="mb-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                          {movie.title || movie.original_title}
                        </h2>
                        <p className="mt-4 text-xs md:text-sm lg:text-xl text-gray-300">
                          {movie.overview}
                        </p>
                      </div>
                      <button
                        onClick={() => handleMoreInfo(movie.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-40 text-center"
                      >
                        More Info
                      </button>
                  </div>
              </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-3xl cursor-pointer`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-3xl cursor-pointer`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export default MovieCarousel;

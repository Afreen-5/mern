import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchTrendingMovies } from "../../services/tmdb.service";

const MovieCarousel: React.FC = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    autoplaySpeed: 2000,
  };

  // Use a higher resolution for images or original to avoid them appearing zoomed.
  const imageUrl = `https://image.tmdb.org/t/p/original`;

  return (
    <div className="py-8">
      <Slider {...settings}>
        {topRatedMovies.map((movie) => (
          <div key={movie.id} className="px-2">
            <img
              className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[90vh] object-cover sm:object-contain rounded-lg"
              src={`${imageUrl}${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;

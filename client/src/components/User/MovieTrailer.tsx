import { useEffect, useState } from "react";
import {
  fetchMovieVideos,
  fetchTrendingMovies,
} from "../../services/tmdb.service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieTrailer: React.FC = () => {
  const [trailers, setTrailers] = useState<any[]>([]);

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        const trailerData = await Promise.all(
          trendingMovies.results.map(async (movie: any) => {
            const videos = await fetchMovieVideos(movie.id);
            return videos[0];
          })
        );
        setTrailers(trailerData.filter((video) => video !== "undefined"));
      } catch (error) {
        console.error("Error loading trailers:", error);
      }
    };
    loadTrailers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: () => {
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.contentWindow?.postMessage(
          '{"event": "command", "func": "pauseVideo", "args": ""}',
          "*"
        );
      });
    },
  };

  return (
    <div className="py-8">
      <Slider {...settings} className="w-full h-full">
        {trailers.map((trailer) => (
          <div key={trailer.id} className="px-2">
            <iframe
              className="w-full h-80 rounded-lg object-cover"
              src={`https://www.youtube.com/embed/${trailer.key}?enablejsapi=1`}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieTrailer;

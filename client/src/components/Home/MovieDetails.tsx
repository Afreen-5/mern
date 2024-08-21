import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieVideos, movieReviews as fetchMovieReviews } from "../../services/tmdb.service";
import Header from "./Header";
import Footer from "./Footer";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [trailer, setTrailer] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(Number(movieId));
        const movieTrailer = await fetchMovieVideos(Number(movieId));
        const movieReviewsData = await fetchMovieReviews(Number(movieId));
        
        setMovie(movieData);
        setTrailer(movieTrailer[0] || null);
        setReviews(movieReviewsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading movie details:", error);
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
      <div className="bg-gradient-to-b from-stone-900 to-stone-600 text-white">
      <Header />
        {movie && (
          <>
            <div className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] relative">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 md:p-8 lg:p-12 ">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{movie.title}</h1>
                <p className="mt-2 text-base md:text-lg lg:text-xl">{movie.overview}</p>
                <div className="mt-10">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Reviews:</h2>
                  {reviews.length ? (
                    <ul className="mt-8 space-y-4">
                      {reviews.map((review) => (
                        <li key={review.id} className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-semibold text-lg">{review.author}</h3>
                          <p className="mt-2 text-base">{review.content}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews available.</p>
                  )}
                </div>
            </div>
            <div className="pt-16">
              <Footer />
            </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;

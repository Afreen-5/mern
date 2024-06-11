import React from 'react';

export interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md transform transition-transform duration-300 hover:scale-125">
      <img className="w-full h-64 object-cover" src={imageUrl} alt={movie.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;

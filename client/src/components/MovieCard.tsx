import React from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath }) => {
  return (
    <div className="p-2">
      <Link to={`/movie/${id}`} className="block">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="w-full h-auto rounded"
        />
        <h3 className="mt-2 text-center text-lg font-bold">{title}</h3>
      </Link>
    </div>
  );
};

export default MovieCard;

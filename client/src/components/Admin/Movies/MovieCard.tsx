import React from 'react';

interface MovieCardProps {
  movie: any;
  onEdit: () => void;
  onDelete: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p>{movie.description}</p>
      {/* Display other movie details */}
      <div className="mt-4 flex justify-between">
        <button onClick={onEdit} className="bg-green-500 hover:bg-green-800 cursor-pointer text-white p-2 rounded">
          Edit
        </button>
        <button onClick={onDelete} className="bg-red-500 hover:bg-red-800 cursor-pointer text-white p-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

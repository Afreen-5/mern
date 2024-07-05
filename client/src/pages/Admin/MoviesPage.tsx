import React, { useEffect, useState } from "react";
import MovieForm from "../../components/Admin/Movies/MovieForm";
import { deleteMovie, getAllMovies } from "../../services/movie.service";
import MovieCard from "../../components/Admin/Movies/MovieCard";

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]); // Adjust type as necessary
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null); // For editing

  const fetchMovies = async () => {
    const response = await getAllMovies();
    console.log(response, "Fetched movies form API");
    setMovies(response);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (movieId: string) => {
    await deleteMovie(movieId);
    fetchMovies();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Manage Movies</h1>
      <MovieForm
        onSuccess={() => fetchMovies()} // Use onSuccess instead of onSubmit
        movie={selectedMovie} // Pass initialData as necessary
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onEdit={() => setSelectedMovie(movie)}
            onDelete={() => handleDelete(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;

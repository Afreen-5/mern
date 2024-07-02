import React, { useState } from "react";
import { addMovies, updateMovie } from "../services/movie.service";

interface MovieFormProps {
  movie?: {
    id?: string;
    title?: string;
    description?: string;
    releaseDate?: string;
    genre?: string[];
    cast?: string[];
    posterPath?: string;
    rating?: number;
  };
  onSuccess: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    description: movie?.description || "",
    releaseDate: movie?.releaseDate || "",
    genre: movie?.genre || [],
    cast: movie?.cast || [],
    posterPath: movie?.posterPath || "",
    rating: movie?.rating || 0,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (movie?.id) {
      await updateMovie(movie.id, formData);
    } else {
      await addMovies(formData);
    }
    onSuccess();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="releaseDate"
        value={formData.releaseDate}
        onChange={handleChange}
      />
      <input
        type="range"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
      />
      <input
        type="range"
        name="cast"
        value={formData.cast}
        onChange={handleChange}
      />
      <input
        type="text"
        name="posterPath"
        value={formData.posterPath}
        onChange={handleChange}
      />
      <input
        type="number"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;

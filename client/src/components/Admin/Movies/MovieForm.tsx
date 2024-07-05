import React, { useState, useEffect } from "react";
import { addMovies, updateMovie } from "../../../services/movie.service";

interface MovieFormProps {
  movie?: {
    id?: string;
    title?: string;
    description?: string;
    releaseDate?: string;
    genre?: string[];
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
    posterPath: movie?.posterPath || "",
    rating: movie?.rating || 0,
  });

  useEffect(() => {
    setFormData({
      title: movie?.title || "",
      description: movie?.description || "",
      releaseDate: movie?.releaseDate || "",
      genre: movie?.genre || [],
      posterPath: movie?.posterPath || "",
      rating: movie?.rating || 0,
    });
  }, [movie]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (movie?.id) {
        await updateMovie(movie.id, formData);
      } else {
        await addMovies(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("An error occurred while saving the movie.");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'genre' ? value.split(',') : value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-4 max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">{movie?.id ? "Edit Movie" : "Add New Movie"}</h2>
      
      <label className="block">
        <span className="text-gray-700">Title</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter movie title"
          className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter movie description"
          className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        ></textarea>
      </label>

      <label className="block">
        <span className="text-gray-700">Release Date</span>
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Genre</span>
        <select
          name="genre"
          value={formData.genre.join(',')} // Joining for display
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          multiple
        >
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          {/* Add more options as needed */}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Poster Path</span>
        <input
          type="text"
          name="posterPath"
          value={formData.posterPath}
          onChange={handleChange}
          placeholder="Enter poster URL"
          className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Rating</span>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          placeholder="Enter movie rating"
          className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {movie?.id ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
};

export default MovieForm;

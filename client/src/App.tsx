import { useEffect, useState } from "react"
import { fetchMovies } from "./api/tmdb";
import Header from "./components/Header";
import MovieCard, { MovieCardProps } from "./components/MovieCard";
import Footer from "./components/Footer";

const App = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const popularMovies = await fetchMovies('popular');
      console.log(popularMovies.results, "Movies list")
      setMovies(popularMovies.results);
    };
    loadMovies();
  }, []);

  return(
    <>
    <div className="m-0 p-0 bg-gray-500">
      <div className="container mx-auto">
        <Header />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
         { movies.map( (movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default App;
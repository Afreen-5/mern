import React, { useEffect, useState } from "react";
import { genresCount, moviesCount } from "../../services/stat.service";
import StatsCard from "../../components/Admin/DashboardOverview/StatCard";
import MovieChart from "../../components/Admin/DashboardOverview/MovieChart";

const Dashboard: React.FC = () => {
  const [movieCount, setMovieCount] = useState<number | null>(null);
  const [genreCount, setGenreCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const moviesResponse = await moviesCount();
      const genresResponse = await genresCount();
      if (moviesResponse && moviesResponse.data) {
        setMovieCount(moviesResponse.data);
      }
      if (genresResponse && genresResponse.data) {
        setGenreCount(genresResponse.data);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {movieCount !== null && (
          <StatsCard title="Total Movies Count" value={movieCount} color="blue" />
        )}
        {genreCount !== null && (
          <StatsCard
            title="Total Genres Count"
            value={genreCount}
            color="green"
          />
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 h-full">
        <MovieChart />
      </div>
    </div>
  );
};

export default Dashboard;

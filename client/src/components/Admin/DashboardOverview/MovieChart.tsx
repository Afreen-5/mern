import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { moviesByMonth } from "../../../services/movie.service";

// Define the data type
interface MovieData {
  month: string;
  count: number;
}

const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MovieChart: React.FC = () => {
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const movies = await moviesByMonth();
      const dataWithAllMonths = fillMissingMonths(movies);
      const sortedMovies = sortDataByMonth(dataWithAllMonths);
      setMovieData(sortedMovies);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoading(false);
    }
  };

  // Sort data based on the predefined month order
  const sortDataByMonth = (data: MovieData[]): MovieData[] => {
    return data.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );
  };

  // Ensure all months are included with count of 0 if missing
  const fillMissingMonths = (data: MovieData[]): MovieData[] => {
    return monthOrder.map((month) => {
      const found = data.find((item) => item.month === month);
      return found ? found : { month, count: 0 };
    });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={movieData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ opacity: 0.8 }}
          />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MovieChart;

import { HttpException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocumet } from './entities/movie.entity';
import mongoose, { Model } from 'mongoose';
import { fetchPopularMovies } from './tmdb.service';
@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocumet>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    return this.movieModel.create(createMovieDto);
  }

  findAllByPage(page = 1, limit = 10) {
    return this.movieModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 400);

    const movie = await this.movieModel.findById(id).exec();
    if (!movie) throw new HttpException('Movie not found', 404);

    return movie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    return this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true });
  }

  remove(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    return this.movieModel.findByIdAndDelete(id);
  }

  //          -----------------------------------******   CUSTOM FUNCTIONS   ******-----------------------------------------

  // Fetch movies from tmdb api and storing it locally in DB
  async saveFetchedMovies(category: string) {
    const movies = await fetchPopularMovies(category);
    if (Array.isArray(movies)) {
      try {
        const savedMovies = movies.map(async (movie: any) => {
          const mappedMovie = this.mapMovies(movie);
          await new this.movieModel(mappedMovie).save();
        });
        await Promise.all(savedMovies);
        console.log('All movies saved successfully');
      } catch (error) {
        console.error('Error saving movies data', error);
      }
    } else {
      console.error('Fetched movies is not a valid array');
    }
  }

  // mapping the fetched movie details with the entity data
  mapMovies(movie: any) {
    return {
      title: movie.title,
      description: movie.overview,
      release_date: new Date(movie.release_date),
      rating: movie.vote_average,
      genreIds: movie.genre_ids.map(String),
      poster_path: movie.poster_path,
    };
  }

  async findAllMoviesCount() {
    const totalMovies = await this.movieModel.countDocuments().exec();
    return totalMovies;
  }

  async getMovieStats() {
    const totalMovies = await this.movieModel.countDocuments().exec();

    const moviesByGenre = await this.movieModel.aggregate([
      {
        $unwind: '$genreIds',
      },
      {
        $lookup: {
          from: 'genreIds',
          localField: 'genreIds',
          foreignField: 'genresId',
          as: 'genreDetails',
        },
      },
      {
        $unwind: '$genreDetails',
      },
      {
        $group: {
          _id: '$genreDetails.genre',
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      totalMovies,
      moviesByGenre,
    };
  }

  async getMoviesAddedPerMonth(): Promise<{ month: string; count: number }[]> {
    const moviesAddedPerMonth = await this.movieModel.aggregate([
      {
        $group: {
          _id: { $month: '$release_date' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          count: 1
        }
      }
    ]);
  
    // Ensure all months are included, even if they have a count of 0
    const allMonths = Array.from({ length: 12 }, (_, i) => ({
      month: this.getMonthName(i + 1),
      count: 0
    }));
  
    // Reverse mapping from month names to month numbers
    const monthNameToNumber: { [key: string]: number } = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };
  
    // Merge aggregated data with the allMonths array
    const mergedData = allMonths.map(monthData => {
      const monthNumber = monthNameToNumber[monthData.month]; // Get the month number from the name
      const found = moviesAddedPerMonth.find(m => m.month === monthNumber);
      return found ? { month: monthData.month, count: found.count } : monthData;
    });
  
    return mergedData;
  }
  
  private getMonthName(month: number): string {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month - 1] || '';
  }
  
}
